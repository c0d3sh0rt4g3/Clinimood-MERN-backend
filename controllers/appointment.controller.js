import User from "../models/user.model.js"
import Appointment from "../models/appointment.model.js";

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

// Make an apointment
export const makeAppointment = async (req, res) => {
    const { patientDNI, doctorDNI, date, description, status } = req.body;

    try {
        // Verify that there's a patient with that DNI
        const patient = await User.findOne({ DNI: patientDNI });
        if (!patient || patient.role !== 'patient') {
            return res.status(400).json({ message: `Patient not found with DNI: ${patientDNI}` });
        }

        // Verify that there's a doctor with that DNI
        const doctor = await User.findOne({ DNI: doctorDNI });
        if (!doctor || doctor.role !== 'doctor') {
          return res.status(400).json({ message: `Doctor not found with DNI: ${doctorDNI}` });
        }

        // Create the medical appointment
        const newAppointment = new Appointment({
          patientDNI,
          doctorDNI,
          date: date,
          description,
          status: 'pending'
        });

        // We save the appointment in the DB
        await newAppointment.save();

        res.status(201).json({ message: 'Medical appointment made succesfully', appointment: newAppointment });
    } catch (error) {
        console.error(`Error in creating appointment: ${error.message}`)
        res.status(500).json({ message: 'Error creating an appointment', error: error.message});
    }
}