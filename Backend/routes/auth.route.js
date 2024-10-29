import express from 'express';
import { registerPatient } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/registerPatient', registerPatient);

export default router;