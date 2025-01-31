import mongoose from "mongoose";

/**
 * Medical appointments DB schema.
 * @typedef {Object} AppointmentSchema
 * @property {string} patientDNI - DNI of the patient (required).
 * @property {string} doctorDNI - DNI of the doctor (required).
 * @property {Date} date - Date and time of the appointment (required).
 * @property {string} [description] - Optional description of the appointment.
 * @property {string} status - Status of the appointment. Must be one of: 'pending', 'completed', 'confirmed'.
 * @property {Date} createdAt - Timestamp of when the appointment was created (automatically added).
 * @property {Date} updatedAt - Timestamp of when the appointment was last updated (automatically added).
 */
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
});

/**
 * Mongoose model for the Appointment schema.
 * @type {mongoose.Model<AppointmentSchema>}
 */
const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;