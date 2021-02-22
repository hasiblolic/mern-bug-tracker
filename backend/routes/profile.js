import express from 'express';
import checkObjectId from '../middleware/checkObjectId';
import auth from '../middleware/auth';
import { profileController } from '../controllers/profile-controller.js';

const router = express.Router();

// get a specific profile
router.get('/:id', checkObjectId, profileController.getTracker);

router.get('/me', auth, profileController.getCurrentUserProfile);

export default router;