import { getUsers, createUser } from '../controllers/user-controller.js';
import express from 'express';

const router = express.Router();

router.get('/', getUsers);
router.post('/add', createUser);

export default router;