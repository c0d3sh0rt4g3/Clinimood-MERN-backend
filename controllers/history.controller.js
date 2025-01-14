import History from "../models/history.model.js"
import Appointment from "../models/appointment.model.js"

// Get all histories
export const getAllHistories = async (req, res) => {
    try {
        const histories = await History.find({})
        res.status(200).json({success:true, data: histories})
    } catch (error) {
        console.error(`Error in fetching appointments: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}

// Create a new medical history
export const createMedicalHistory = async (req, res) => {
    try {
        const { patientDNI } = req.body

        if (!patientDNI) {
            return res.status(400).json({ message: "Patient DNI is required." })
        }

        const appointments = await Appointment.find({})
        const appointmentsArray = []
        appointments.forEach(appointment => {
            if (appointment.patientDNI === patientDNI) {
                appointmentsArray.push(appointment.id)
            }
        })

        const newHistory = new History({patientDNI, appointmentIdArray: appointmentsArray})

        const savedHistory = await newHistory.save()

        res.status(201).json({message: "Medical history created successfully.", medicalHistory: savedHistory})
    } catch (error) {
        console.error("Error creating medical history:", error)
        res.status(500).json({message: "An error occurred while creating the medical history.", error: error.message})
    }
}
