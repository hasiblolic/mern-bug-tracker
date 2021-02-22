import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String
    },
    skills: {
        type: [String]
    },
    social: {
        type: [String]
    }
});

const Profile = mongoose.model('User', profileSchema);
export default Profile;