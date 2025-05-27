import express from 'express';
import {
    createPatient,
    getAllPatients,
    getPatientByPhone,
    deletePatient
} from '../controllers/patientController.js';

const router = express.Router();

router.post('/', createPatient);
router.get('/', getAllPatients);
router.get('/phone/:phone', getPatientByPhone);
router.delete('/:id', deletePatient);

export default router;