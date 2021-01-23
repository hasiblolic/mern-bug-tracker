import express from 'express';
import Tracker from '../models/tracker.model.js';

const router = express.Router();

router.route('/').get((req, res) => {
    Tracker.find()
        .then(trackers => res.json(trackers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description =  req.body.description;
    const resolved = req.body.resolved;
    const date = Date.parse(req.body.date);

    const newTracker = new Tracker({
        username,
        description,
        resolved,
        date,
    });

    newTracker.save()
        .then(() => res.json('Bug Tracker added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Tracker.findById(req.params.id)
        .then(tracker => res.json(tracker))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Tracker.findByIdAndDelete(req.params.id)
        .then(() => res.json('Bug Tracker deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Tracker.findById(req.params.id)
        .then(tracker => {
            tracker.username = req.body.username;
            tracker.description = req.body.description;
            tracker.resolved = req.body.resolved;
            tracker.date = Date.parse(req.body.date);

            tracker.save()
                .then(() => res.json('Bug Tracker updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;