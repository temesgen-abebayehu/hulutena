import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { getUser, updateUser, verifyProfile, getSenderName, deleteUser } from '../controllers/user.controller.js';


const router = express.Router();

router.get('/:id',protectRoute, getUser);
router.patch('/:id',protectRoute, updateUser);
router.post('/verify/:id',protectRoute, verifyProfile);
router.get('/sender/:id', getSenderName);
router.delete('/:id',protectRoute, deleteUser);


export default router;