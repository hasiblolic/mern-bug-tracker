import express from 'express';
import checkObjectId from '../middleware/checkObjectId';
import { profileController } from '../controllers/tracker-controller.js';

const router = express.Router();

// get a specific tracker
router.get('/:id', checkObjectId, profileController.getTracker);

export default router;