import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const trackerSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    resolved: { type: Boolean, required: true },
    date: { type: Date, required: true },
    posts: [String],
}, { timestamps: true });

const Tracker = mongoose.model('Tracker', trackerSchema);
export default Tracker;