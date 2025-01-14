import mongoose from "mongoose";

// Medical history DB schema
const historySchema = new mongoose.Schema({
    patientDNI: {
        type: String,
        required: true
    },
    appointmentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
}, {
    timestamps: true
})

const History = mongoose.model('History', historySchema);

export default History;
