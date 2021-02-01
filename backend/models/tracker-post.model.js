import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const trackerPostSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

export default trackerPostSchema;