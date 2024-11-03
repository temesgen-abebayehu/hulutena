import express from 'express';
import { getDoctor, getDoctors, searchDoctor } from '../controllers/doctor.controller.js';

const router = express.Router();


router.get('/search', searchDoctor);
router.get('/:id', getDoctor);
router.get('/', getDoctors);


export default router;