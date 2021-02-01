import { userController } from '../controllers/user-controller.js';
import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// api/users/register
router.post('/register', userController.registerUser);
router.get('/dashboard', auth, userController.dashboard);

// api/users/
// get user by token
router.get('/auth', auth, userController.getUserByToken);

// api/users/auth
// authenticate user and get token
router.post('/auth', userController.loginUser);

export default router;