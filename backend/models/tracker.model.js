import mongoose from 'mongoose';

const trackerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    resolved: { type: Boolean, required: true },
    date: { type: Date, default: new Date() },
    posts: [ String ],
}, { timestamps: true });

const Tracker = mongoose.model('Tracker', trackerSchema);
export default Tracker;