import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { getUser, updateUser, verifyProfile } from '../controllers/user.controller.js';


const router = express.Router();

router.get('/:id',protectRoute, getUser);
router.put('/:id',protectRoute, updateUser);
router.post('/verify/:id',protectRoute, verifyProfile);


export default router;