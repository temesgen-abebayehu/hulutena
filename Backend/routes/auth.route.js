import express from 'express';
import { hello } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', hello);

export default router;