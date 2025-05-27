import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
});

describe('Appointment API', () => {
    it('should create a new appointment', async () => {
        const res = await request(app)
            .post('/api/appointments')
            .send({
                patientName: 'Test User',
                phone: '11999999999',
                specialty: 'Cardiology',
                dateTime: new Date(Date.now() + 3600000),
                status: 'pending'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('appointment');
    });

    it('should not allow duplicate dateTime', async () => {
        const dateTime = new Date(Date.now() + 7200000);
        await Appointment.create({
            patientName: 'User',
            phone: '11888888888',
            specialty: 'Dermatology',
            dateTime,
            status: 'pending'
        });
        const res = await request(app)
            .post('/api/appointments')
            .send({
                patientName: 'User2',
                phone: '11777777777',
                specialty: 'Dermatology',
                dateTime,
                status: 'pending'
            });
        expect(res.statusCode).toBe(400);
    });
});

afterAll(async () => {
    await Appointment.deleteMany();
    await mongoose.connection.close();
});