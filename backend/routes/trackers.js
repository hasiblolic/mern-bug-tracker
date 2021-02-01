import express from 'express';
import { trackerController } from '../controllers/tracker-controller.js';

const router = express.Router();

// fetch all trackers
router.get('/', trackerController.getAllTrackers);

// create a new tracker
router.post('/add', trackerController.createTracker);

// get a specific tracker
router.get('/:id', trackerController.getTracker);

// update a specific tracker
router.post('/update/:id', trackerController.updateTracker);

// delete a specific tracker
router.delete('/:id', trackerController.deleteTracker);

export default router;