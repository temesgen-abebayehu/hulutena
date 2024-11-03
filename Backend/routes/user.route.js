import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { getUser, updateUser } from '../controllers/user.controller.js';


const router = express.Router();

router.get('/profile/:id',protectRoute, getUser);
router.put('/profile/:id',protectRoute, updateUser);


export default router;