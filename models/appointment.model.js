import mongoose from "mongoose";

// Medical appointments DB shema
const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    description: String,
    status: String
}, {
    timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;