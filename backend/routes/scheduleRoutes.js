import express from 'express';
import { createSchedule, getAllSchedules, deleteSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/', createSchedule);
router.get('/', getAllSchedules);
router.delete('/:id', deleteSchedule);

export default router;