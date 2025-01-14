import User from "../models/user.model.js"
import Appointment from "../models/appointment.model.js"
import res from "express/lib/response.js";

// Get all appointments
export const getAllAppointments = async (req, res) => {
    try{
        const appointments = await Appointment.find({})
        res.status(200).json({success: true, data: appointments})
    } catch(error){
        console.error(`Error in fetching appointments: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}

// Make an apointment
export const makeAppointment = async (req, res) => {
    const { patientDNI, doctorDNI, date, description, status } = req.body

    try {
        // Verify that there's a patient with that DNI
        const patient = await User.findOne({ DNI: patientDNI })
        if (!patient || patient.role !== 'patient') {
            return res.status(400).json({ message: `Patient not found with DNI: ${patientDNI}` })
        }

        // Verify that there's a doctor with that DNI
        const doctor = await User.findOne({ DNI: doctorDNI })
        if (!doctor || doctor.role !== 'doctor') {
          return res.status(400).json({ message: `Doctor not found with DNI: ${doctorDNI}` })
        }

        // Create the medical appointment
        const newAppointment = new Appointment({
          patientDNI,
          doctorDNI,
          date: date,
          description,
          status: 'pending'
        })

        // We save the appointment in the DB
        await newAppointment.save()

        res.status(201).json({ message: 'Medical appointment made succesfully', appointment: newAppointment })
    } catch (error) {
        console.error(`Error in creating appointment: ${error.message}`)
        res.status(500).json({ message: 'Error creating an appointment', error: error.message})
    }
}

// Edit an existing appointment
export const editAppointment = async (req, res) => {
    const { id } = req.params
    const updates = req.body
    const { patientDNI, doctorDNI } = updates

    try {
        // Find the appointment by ID
        const appointment = await Appointment.findById(id)
        if (!appointment) {
            return res.status(404).json({ message: `Appointment not found with ID: ${id}` })
        }

        // Verify that the patient with the given DNI exists and has the 'patient' role
        if (patientDNI) {
            const patient = await User.findOne({ DNI: patientDNI })
            if (!patient || patient.role !== 'patient') {
                return res.status(400).json({ message: `Patient not found with DNI: ${patientDNI}` })
            }
        }

        // Verify that the doctor with the given DNI exists and has the 'doctor' role
        if (doctorDNI) {
            const doctor = await User.findOne({ DNI: doctorDNI })
            if (!doctor || doctor.role !== 'doctor') {
                return res.status(400).json({ message: `Doctor not found with DNI: ${doctorDNI}` })
            }
        }

        // Update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, { new: true })

        if (!updatedAppointment) {
            return res.status(404).json({ message: `Appointment with ID: ${id} not found` })
        }

        res.status(200).json({ message: 'Appointment updated successfully', appointment: updatedAppointment })
    } catch (error) {
        console.error(`Error in updating appointment: ${error.message}`)
        res.status(500).json({ message: 'Error updating the appointment', error: error.message })
    }
}

// Deletes an appointment
export const deleteAppointment = async (req, res) => {
    const { id } = req.params

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id)
        if (!deletedAppointment) {
            return res.status(404).json({success: false, message: `Appointment with ID: ${id} not found` })
        }
        res.status(200).json({success:true, message: `Appointment with id ${id} deleted succesfully`})
    } catch (error) {
        console.error(`Error in deleting appointment: ${error.message}`)
        res.status(500).json({ success: false, error: error.message })
    }
}