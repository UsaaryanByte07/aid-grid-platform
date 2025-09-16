import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { createRequest, getRequests, respondToRequest } from '../controllers/requestController.js';

const router = express.Router();

// GET /api/requests - Get donation requests (all for donors, own for hospitals)
router.get('/', authenticate, getRequests);

// POST /api/requests - Create new donation request (hospitals only)
router.post('/', authenticate, authorize('hospital'), createRequest);

// POST /api/requests/:requestId/respond - Respond to a request (donors only)
router.post('/:requestId/respond', authenticate, authorize('donor'), respondToRequest);

export default router;