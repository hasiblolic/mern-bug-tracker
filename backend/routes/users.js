import { userController } from '../controllers/user-controller.js';
import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// api/users/register
// after user is registered, they are logged in and issued a new token
router.post('/register', userController.registerUser);

// api/users/dashboard
// user needs to be logged in with valid credentials to see the dashboard
router.get('/dashboard', auth, userController.dashboard);

// api/users/
// returns a user based on the token
router.get('/auth', auth, userController.getUserByToken);

// api/users/auth
// authenticate user and get token - use to issue a token, so auth middleware is not used
router.post('/auth', userController.loginUser);

export default router;
