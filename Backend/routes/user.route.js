import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { getUser, updateUser } from '../controllers/user.controller.js';


const router = express.Router();

router.get('/:id',protectRoute, getUser);
router.put('/:id',protectRoute, updateUser);


export default router;