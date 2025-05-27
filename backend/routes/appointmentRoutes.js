import express from 'express';
import {
    createAppointment,
    getAllAppointments,
    getAppointmentsByPatient,
    updateAppointmentStatus,
    deleteAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.get('/patient/:patientName', getAppointmentsByPatient);
router.put('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

export default router;