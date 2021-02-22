import Profile from '../models/profile.model.js';
import checkObjectId from '../middleware/checkObjectId';

export const trackerController = {
    // get the profile by id
    // GET api/profile/user/:user_id
    async getProfileById({ params: {user_id } }, res) {
        try {
            const profile = await Profile.findOne({
                user: user_id
            }).populate('user', ['username', 'avatar']);

            if(!profile) return res.status(400).json({ msg: 'Profile not found' });

            return res.json(profile);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: 'Server error' });
        }
    },
}