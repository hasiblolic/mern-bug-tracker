import Tracker from '../models/tracker.model.js';

export const trackerController = {
    async getAllTrackers(req, res) {
        try {
            Tracker.find()
                .then(trackers => res.json(trackers))
                .catch(err => res.status(400).json('Error: ' + err));
        } catch (error) {
            console.log(error);
        }
    },

    async createTracker(req, res) {
        try {
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
        } catch (error) {
            console.log(error);
        }
    },

    async deleteTracker(req, res) {
        try {
            Tracker.findByIdAndDelete(req.params.id)
                .then(() => res.json('Bug Tracker deleted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        } catch (error) {
            console.log(error);
        }
    },

    async getTracker(req, res) {
        try {
            Tracker.findById(req.params.id)
                .then(tracker => res.json(tracker))
                .catch(err => res.status(400).json('Error: ' + err));
        } catch (error) {
            console.log(error);
        }
    },

    async updateTracker(req, res) {
        try {
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
        } catch (error) {
            
        }
    }
}