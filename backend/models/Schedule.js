import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    dateTime: {
        type: Date,
        required: true,
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;