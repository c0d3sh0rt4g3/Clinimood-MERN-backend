import mongoose from "mongoose";

// Medical history DB schema
const historySchema = new mongoose.Schema({
    patientDNI: {
        type: String,
        required: true
    },
    appointmentIdArray: [{ // Renamed field for clarity
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
}, {
    timestamps: true
});

const History = mongoose.model('History', historySchema);

export default History;
