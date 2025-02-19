import express, { Express, Request, Response } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/userControllers';
import protect from '../middleware/auth';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

export default router;
