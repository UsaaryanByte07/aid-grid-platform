import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getMyDonations, recordDonation } from '../controllers/donationController.js';

const router = express.Router();

// GET /api/donations/my - Get donor's donation history
router.get('/my', authenticate, authorize('donor'), getMyDonations);

// POST /api/donations/record - Record a new donation
router.post('/record', authenticate, authorize('donor'), recordDonation);

export default router;