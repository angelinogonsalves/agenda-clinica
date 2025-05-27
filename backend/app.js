import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointmentRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import patientRoutes from './routes/patientRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/appointments', appointmentRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/patients', patientRoutes);

export default app;