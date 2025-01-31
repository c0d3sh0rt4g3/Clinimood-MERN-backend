import History from "../models/history.model.js";
import Appointment from "../models/appointment.model.js";

/**
 * Fetches all medical histories from the database.
 * @async
 * @function getAllHistories
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON response with the list of medical histories or an error message.
 */
export const getAllHistories = async (req, res) => {
    try {
        const histories = await History.find({});
        res.status(200).json({ success: true, data: histories });
    } catch (error) {
        console.error(`Error in fetching medical histories: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Creates a new medical history for a patient.
 * @async
 * @function createMedicalHistory
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.patientDNI - The DNI of the patient for whom the medical history is being created.
 * @returns {Promise<void>} - Returns a JSON response with the created medical history or an error message.
 */
export const createMedicalHistory = async (req, res) => {
    try {
        const { patientDNI } = req.body;

        if (!patientDNI) {
            return res.status(400).json({ message: "Patient DNI is required." });
        }

        // Fetch all appointments
        const appointments = await Appointment.find({});
        const appointmentsArray = [];

        // Filter appointments belonging to the specified patient
        appointments.forEach(appointment => {
            if (appointment.patientDNI === patientDNI) {
                appointmentsArray.push(appointment.id);
            }
        });

        // Create a new medical history
        const newHistory = new History({ patientDNI, appointmentIdArray: appointmentsArray });

        // Save the medical history to the database
        const savedHistory = await newHistory.save();

        res.status(201).json({ message: "Medical history created successfully.", medicalHistory: savedHistory });
    } catch (error) {
        console.error("Error creating medical history:", error);
        res.status(500).json({ message: "An error occurred while creating the medical history.", error: error.message });
    }
};

/**
 * Deletes a medical history for a specified patient.
 * @async
 * @function deleteHistory
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.patientDNI - The DNI of the patient whose medical history is to be deleted.
 * @returns {Promise<void>} - Returns a JSON response indicating success or failure.
 */
export const deleteHistory = async (req, res) => {
    const { patientDNI } = req.params;

    try {
        // Find and delete the medical history by patient DNI
        const deletedHistory = await History.findOneAndDelete({ patientDNI: patientDNI });
        if (!deletedHistory) {
            return res.status(404).json({ success: false, message: `Medical history of the patient with DNI ${patientDNI} not found` });
        }

        res.status(200).json({ success: true, message: `Medical history of patient with DNI ${patientDNI} deleted successfully` });
    } catch (error) {
        console.error(`Error in deleting medical history: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};