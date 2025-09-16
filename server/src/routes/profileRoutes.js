import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

// GET /api/profile
router.get('/', authenticate, getProfile);

// PUT /api/profile
router.put('/', authenticate, updateProfile);

export default router;