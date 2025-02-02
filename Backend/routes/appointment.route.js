import express from 'express';
import authorizeDoctor from '../middlewares/authorizeDoctor.js';
import { createAppointment, deleteAppointment, getAppointment, getAppointments, updateAppointment } from '../controllers/appointment.controller.js';


const router = express.Router();

router.post('/create',authorizeDoctor, createAppointment);
router.get('/:id', getAppointment);
router.get('/', getAppointments);
router.put('/:id',authorizeDoctor, updateAppointment);
router.delete('/:id',authorizeDoctor, deleteAppointment);

export default router;