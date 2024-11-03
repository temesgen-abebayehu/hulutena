import express from 'express';
import { Login, Logout, Register, AuthenticatUser } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.get('/me', protectRoute, AuthenticatUser);

export default router;