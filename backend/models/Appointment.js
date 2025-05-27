import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'O nome do paciente é obrigatório.']
    },
    phone: {
        type: String,
        required: [true, 'O telefone é obrigatório.']
    },
    specialty: {
        type: String,
        required: [true, 'A especialidade é obrigatória.']
    },
    dateTime: {
        type: Date,
        required: [true, 'A data e hora do agendamento são obrigatórias.'],
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
});


const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;