import express from 'express';
import Request from '../models/Request.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateCreateRequest, validateUpdateRequest, validateRequest } from '../middleware/validation.js';
import { sendError, sendSuccess, getPagination, getPaginationMeta, buildFilter, buildSort } from '../utils/helpers.js';

const router = express.Router();

// @route   GET /api/requests
// @desc    Get all requests with filtering, pagination, and sorting
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
    const filter = buildFilter(req.query);
    const sort = buildSort(req.query.sortBy, req.query.order);

    // Get total count for pagination
    const total = await Request.countDocuments(filter);

    // Get requests with pagination
    const requests = await Request.find(filter)
      .populate('requester', 'name email role profile')
      .populate('verifiedBy', 'name role')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const meta = getPaginationMeta(total, page, limit);

    sendSuccess(res, 'Requests retrieved successfully', { requests }, 200, meta);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/requests/:id
// @desc    Get a single request by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('requester', 'name email role profile')
      .populate('verifiedBy', 'name role')
      .populate('donors.user', 'name profile');

    if (!request) {
      return sendError(res, 'Request not found', 404);
    }

    sendSuccess(res, 'Request retrieved successfully', { request });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/requests
// @desc    Create a new request
// @access  Private
router.post('/', authenticate, validateCreateRequest, validateRequest, async (req, res, next) => {
  try {
    const requestData = {
      ...req.body,
      requester: req.user.id
    };

    const request = await Request.create(requestData);
    await request.populate('requester', 'name email role profile');

    sendSuccess(res, 'Request created successfully', { request }, 201);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/requests/:id
// @desc    Update a request
// @access  Private (Owner or Admin)
router.put('/:id', authenticate, validateUpdateRequest, validateRequest, async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return sendError(res, 'Request not found', 404);
    }

    // Check if user is the owner or admin
    if (request.requester.toString() !== req.user.id && req.user.role !== 'admin') {
      return sendError(res, 'Not authorized to update this request', 403);
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('requester', 'name email role profile');

    sendSuccess(res, 'Request updated successfully', { request: updatedRequest });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/requests/:id
// @desc    Delete a request
// @access  Private (Owner or Admin)
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return sendError(res, 'Request not found', 404);
    }

    // Check if user is the owner or admin
    if (request.requester.toString() !== req.user.id && req.user.role !== 'admin') {
      return sendError(res, 'Not authorized to delete this request', 403);
    }

    await Request.findByIdAndDelete(req.params.id);

    sendSuccess(res, 'Request deleted successfully');
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/requests/:id/donate
// @desc    Add a donation to a request
// @access  Private
router.post('/:id/donate', authenticate, async (req, res, next) => {
  try {
    const { amount, message } = req.body;

    if (!amount || amount <= 0) {
      return sendError(res, 'Please provide a valid donation amount', 400);
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
      return sendError(res, 'Request not found', 404);
    }

    if (request.status === 'closed' || request.status === 'fulfilled') {
      return sendError(res, 'This request is no longer accepting donations', 400);
    }

    // Check if user is trying to donate to their own request
    if (request.requester.toString() === req.user.id) {
      return sendError(res, 'You cannot donate to your own request', 400);
    }

    // Add donation
    const donation = {
      user: req.user.id,
      amount: parseFloat(amount),
      message: message || '',
      donatedAt: new Date()
    };

    request.donors.push(donation);
    request.raisedAmount += donation.amount;

    // Check if target amount is reached
    if (request.targetAmount && request.raisedAmount >= request.targetAmount) {
      request.status = 'fulfilled';
    }

    await request.save();

    await request.populate('donors.user', 'name profile');

    sendSuccess(res, 'Donation added successfully', { 
      request,
      donation: request.donors[request.donors.length - 1]
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/requests/:id/update
// @desc    Add an update to a request
// @access  Private (Owner only)
router.post('/:id/update', authenticate, async (req, res, next) => {
  try {
    const { title, content, images } = req.body;

    if (!title || !content) {
      return sendError(res, 'Please provide title and content for the update', 400);
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
      return sendError(res, 'Request not found', 404);
    }

    // Check if user is the owner
    if (request.requester.toString() !== req.user.id) {
      return sendError(res, 'Not authorized to add updates to this request', 403);
    }

    const update = {
      title,
      content,
      images: images || [],
      createdAt: new Date()
    };

    request.updates.push(update);
    await request.save();

    sendSuccess(res, 'Update added successfully', { 
      request,
      update: request.updates[request.updates.length - 1]
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/requests/:id/verify
// @desc    Verify a request (Admin only)
// @access  Private (Admin only)
router.put('/:id/verify', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return sendError(res, 'Request not found', 404);
    }

    if (request.isVerified) {
      return sendError(res, 'Request is already verified', 400);
    }

    request.isVerified = true;
    request.verifiedBy = req.user.id;
    request.verifiedAt = new Date();

    await request.save();
    await request.populate('verifiedBy', 'name role');

    sendSuccess(res, 'Request verified successfully', { request });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/requests/user/:userId
// @desc    Get requests by user ID
// @access  Public
router.get('/user/:userId', async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
    const filter = { requester: req.params.userId, ...buildFilter(req.query) };
    const sort = buildSort(req.query.sortBy, req.query.order);

    const total = await Request.countDocuments(filter);
    const requests = await Request.find(filter)
      .populate('requester', 'name email role profile')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const meta = getPaginationMeta(total, page, limit);

    sendSuccess(res, 'User requests retrieved successfully', { requests }, 200, meta);
  } catch (error) {
    next(error);
  }
});

export default router;