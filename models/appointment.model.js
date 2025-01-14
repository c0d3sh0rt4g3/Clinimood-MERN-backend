import mongoose from "mongoose";

// Medical appointments DB schema
const appointmentSchema = new mongoose.Schema({
    patientDNI: {
        type: String,
        required: true
    },
    doctorDNI: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'completed', 'confirmed'],
        default: "pending",
    }
}, {
    timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
