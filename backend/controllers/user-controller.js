import bcrypt from 'bcryptjs';
import { ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/user.model.js';
import validateLoginInput from '../validation/login-user.js';
import validateRegisterInput from '../validation/register-user.js';

export const userController = {
    // register a new user to the database
    async registerUser(req, res) {
        try {
            const { username, email, password } = req.body;
            const { errors, isValid } = validateRegisterInput(req.body);
            if(!isValid) {
                return res.status(400).json(errors);
            }

            // first try to find if email already exists
            let user = await User.findOne({ email: req.body.email });
            if(user) {
                // user found so email already exists - should ask to redirect to login here
                return res.status(400).json({ email: "Email already exists" });
            } else {
                user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                });

                // hash the password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                await user.save().catch(err => {
                    console.log(err);
                });
                
                const payload = {
                    user: {
                        id: user.id,
                    }
                }
                let a = config.get('jwtSecret');
                console.log(a);

                jwt.sign(
                    payload, 
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) {
                            console.log(err);
                            throw err;
                        };
                        res.json({ token });
                    }
                );
            }
        } catch (error) {
            res.status(400).json(error);
        }
        
    },

    // authenticate user and return a token
    async loginUser(req, res) {
        const { errors, isValid } = validateLoginInput(req.body);
        // check validation
        if(!isValid) {
            return res.status(400).json(errors);
        }
        const { email, password } = req.body;
        try {
            // try to find user
            let user = await User.findOne({ email: req.body.email });
            if(!user) {
                // user doesn't exist so send error message
                errors.email = 'Invalid credentials';
                errors.password = 'Invalid credentials';
                return res.status(400).json(errors);
            }

            // compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                // incorrect password, so send error message
                errors.email = 'Invalid credentials';
                errors.password = 'Invalid credentials';
                return res.status(400).json(errors);
            }

            const payload = { user: { id: user.id } };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: '5 days' },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    },

    async dashboard(req, res) {
        try {
            
        } catch (error) {
            return;
        }
    },

    // get user by the token //GET api/users/auth
    async getUserByToken(req, res) {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }
};
