import mongoose from 'mongoose';

const trackerPostSchema = new mongoose.Schema({
    creator: { type: String },
    description: { type: String },
    date: { type: Date, default: new Date() },
});

const trackerPost = mongoose.model('TrackerPost', trackerPostSchema);
export default trackerPost;
