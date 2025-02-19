import express, { Express, Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/userControllers';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;
