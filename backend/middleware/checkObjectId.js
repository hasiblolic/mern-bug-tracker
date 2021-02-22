import mongoose from 'mongoose';

// middleware to check for a valid object id
const checkObjectId = (id) => (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params[id]))
        return res.status(400).json({ msg: 'Invalid ID' });
    next();
};

export default checkObjectId;