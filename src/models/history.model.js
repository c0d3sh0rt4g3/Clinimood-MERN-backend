import mongoose from "mongoose";

/**
 * Medical history DB schema.
 * @typedef {Object} HistorySchema
 * @property {string} patientDNI - DNI of the patient (required).
 * @property {Array.<mongoose.Types.ObjectId>} appointmentIdArray - Array of appointment IDs associated with the patient.
 * @property {Date} createdAt - Timestamp of when the history was created (automatically added).
 * @property {Date} updatedAt - Timestamp of when the history was last updated (automatically added).
 */
const historySchema = new mongoose.Schema({
    patientDNI: {
        type: String,
        required: true
    },
    appointmentIdArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment' // Reference to the Appointment model
    }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

/**
 * Mongoose model for the History schema.
 * @type {mongoose.Model<HistorySchema>}
 */
const History = mongoose.model('History', historySchema);

export default History;