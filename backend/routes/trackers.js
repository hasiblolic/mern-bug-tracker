import express from 'express';
import { trackerController } from '../controllers/tracker-controller.js';

const router = express.Router();

router.get('/', trackerController.getAllTrackers);
router.get('/:id', trackerController.getTracker);
router.post('/add', trackerController.createTracker);
router.patch('/update/:id', trackerController.updateTracker);
router.delete('/:id', trackerController.deleteTracker);

export default router;