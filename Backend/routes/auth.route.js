import express from 'express';
import { registerDoctor, registerPatient } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/registerPatient', registerPatient);
router.post('/registerDoctor', registerDoctor);

export default router;