import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    }
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;