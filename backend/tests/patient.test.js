import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import Patient from '../models/Patient.js';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
});

describe('Patient API', () => {
    it('should create a new patient', async () => {
        const res = await request(app)
            .post('/api/patients')
            .send({ name: 'Patient Test', phone: '11988887777' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('patient');
    });

    it('should not allow duplicate phone', async () => {
        await Patient.create({ name: 'Patient2', phone: '11988886666' });
        const res = await request(app)
            .post('/api/patients')
            .send({ name: 'Patient3', phone: '11988886666' });
        expect(res.statusCode).toBe(400);
    });

    it('should get all patients', async () => {
        const res = await request(app).get('/api/patients');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

afterAll(async () => {
    await Patient.deleteMany();
    await mongoose.connection.close();
});