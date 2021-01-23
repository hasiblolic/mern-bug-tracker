import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
}

export const createUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const newUser = await new User({ username, password });
        newUser.save()
            .then(() => res.json('User added!'))
            .catch(error => res.status(400).json({ message: error.message }));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}