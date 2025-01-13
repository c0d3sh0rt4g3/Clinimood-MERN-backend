import Appointments from "../models/appointment.model.js"
// Get all appointments
export const getAllAppointments = async (req, res) => {
    try{
        const appointments = await Appointments.find({})
        res.status(200).json({success: true, data: appointments})
    } catch(error){
        console.error(`Error in fetching appointments: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}