import DonationRequest from '../models/DonationRequest.js';

export const createRequest = async (req, res) => {
  try {
    const {
      bloodGroup,
      unitsNeeded,
      urgency,
      description,
      patientAge,
      contactNumber,
      address,
      deadline
    } = req.body;

    // Validate required fields
    if (!bloodGroup || !unitsNeeded || !description || !contactNumber || !address || !deadline) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    const request = new DonationRequest({
      hospital: req.user._id,
      bloodGroup,
      unitsNeeded,
      urgency: urgency || 'medium',
      description,
      patientAge,
      contactNumber,
      address,
      deadline: new Date(deadline)
    });

    await request.save();

    const populatedRequest = await DonationRequest.findById(request._id)
      .populate('hospital', 'name hospitalName location');

    res.status(201).json({
      success: true,
      message: 'Blood request created successfully',
      data: { request: populatedRequest }
    });
  } catch (error) {
    console.error('Create request error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter based on user type and query parameters
    let filter = {};
    
    if (req.user.type === 'hospital') {
      // Hospitals can only see their own requests
      filter.hospital = req.user._id;
    } else {
      // Donors can see all active requests
      filter.status = 'active';
      filter.deadline = { $gt: new Date() };
    }

    // Additional filters from query parameters
    if (req.query.bloodGroup) {
      filter.bloodGroup = req.query.bloodGroup;
    }
    
    if (req.query.urgency) {
      filter.urgency = req.query.urgency;
    }

    if (req.query.status && req.user.type === 'hospital') {
      filter.status = req.query.status;
    }

    const requests = await DonationRequest.find(filter)
      .populate('hospital', 'name hospitalName location')
      .populate('responses.donor', 'name bloodGroup location')
      .sort({ urgency: 1, deadline: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await DonationRequest.countDocuments(filter);

    res.json({
      success: true,
      data: {
        requests,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const respondToRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { message, contactNumber, availableDate } = req.body;

    const request = await DonationRequest.findById(requestId);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    if (request.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This request is no longer active'
      });
    }

    // Check if donor's blood group is compatible
    if (req.user.bloodGroup !== request.bloodGroup && 
        !(req.user.bloodGroup === 'O-' || 
          (req.user.bloodGroup.endsWith('-') && request.bloodGroup.startsWith(req.user.bloodGroup.charAt(0))))) {
      return res.status(400).json({
        success: false,
        message: 'Your blood group is not compatible with this request'
      });
    }

    // Check if donor has already responded
    const existingResponse = request.responses.find(
      response => response.donor.toString() === req.user._id.toString()
    );

    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: 'You have already responded to this request'
      });
    }

    request.responses.push({
      donor: req.user._id,
      message,
      contactNumber,
      availableDate: availableDate ? new Date(availableDate) : undefined
    });

    await request.save();

    const populatedRequest = await DonationRequest.findById(requestId)
      .populate('hospital', 'name hospitalName location')
      .populate('responses.donor', 'name bloodGroup location');

    res.json({
      success: true,
      message: 'Response submitted successfully',
      data: { request: populatedRequest }
    });
  } catch (error) {
    console.error('Respond to request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};