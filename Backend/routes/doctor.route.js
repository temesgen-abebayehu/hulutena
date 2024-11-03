import express from 'express';
import { getDoctor, getDoctors } from '../controllers/doctor.controller.js';

const router = express.Router();

router.get('/', getDoctors);
router.get('/:id', getDoctor);


export default router;