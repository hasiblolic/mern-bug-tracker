import mongoose from 'mongoose';
import trackerPostSchema from './tracker-post.model.js';
const Schema = mongoose.Schema;

const trackerSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    resolved: { type: Boolean, required: true },
    date: { type: Date, required: true },
    posts: [trackerPostSchema],
}, { timestamps: true });

const Tracker = mongoose.model('Tracker', trackerSchema);
export default Tracker;