import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";

/**
 * Controller for handling appointment-related operations.
 * @module AppointmentController
*/

/**
 * Fetches all appointments from the database.
 * @async
 * @function getAllAppointments
 * @memberof module:AppointmentController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON response with the list of appointments or an error message.
 */
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({});
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error(`Error in fetching appointments: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Fetches appointments by DNI (either patientDNI or doctorDNI).
 * @async
 * @function getAppointmentsByDNI
 * @memberof module:AppointmentController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.dni - The DNI to search for.
 * @returns {Promise<void>} - Returns a JSON response with the list of appointments or an error message.
 */
export const getAppointmentsByDNI = async (req, res) => {
    const { dni } = req.params;

    try {
        const appointments = await Appointment.find({
            $or: [{ patientDNI: dni }, { doctorDNI: dni }]
        });

        if (appointments.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No appointments found for DNI: ${dni}`
            });
        }
        res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        console.error(`Error in fetching appointments by DNI: ${error.message}`);
        res.status(500).json({
            success: false,
            error: `Error fetching appointments for DNI: ${error.message}`
        });
    }
};

/**
 * Creates a new medical appointment.
 * @async
 * @function makeAppointment
 * @memberof module:AppointmentController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.patientDNI - DNI of the patient.
 * @param {string} req.body.doctorDNI - DNI of the doctor.
 * @param {Date} req.body.date - Date and time of the appointment.
 * @param {string} [req.body.description] - Optional description of the appointment.
 * @param {string} [req.body.status] - Status of the appointment (default: 'pending').
 * @returns {Promise<void>} - Returns a JSON response with the created appointment or an error message.
 */
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

        // Save the appointment in the DB
        await newAppointment.save();

        res.status(201).json({ message: 'Medical appointment made successfully', appointment: newAppointment });
    } catch (error) {
        console.error(`Error in creating appointment: ${error.message}`);
        res.status(500).json({ message: 'Error creating an appointment', error: error.message });
    }
};

/**
 * Updates an existing appointment.
 * @async
 * @function editAppointment
 * @memberof module:AppointmentController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.id - The ID of the appointment to update.
 * @param {Object} req.body - The updates to apply to the appointment.
 * @param {string} [req.body.patientDNI] - New DNI of the patient.
 * @param {string} [req.body.doctorDNI] - New DNI of the doctor.
 * @param {Date} [req.body.date] - New date and time of the appointment.
 * @param {string} [req.body.description] - New description of the appointment.
 * @param {string} [req.body.status] - New status of the appointment.
 * @returns {Promise<void>} - Returns a JSON response with the updated appointment or an error message.
 */
export const editAppointment = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const { patientDNI, doctorDNI } = updates;

    try {
        // Find the appointment by ID
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: `Appointment not found with ID: ${id}` });
        }

        // Verify that the patient with the given DNI exists and has the 'patient' role
        if (patientDNI) {
            const patient = await User.findOne({ DNI: patientDNI });
            if (!patient || patient.role !== 'patient') {
                return res.status(400).json({ message: `Patient not found with DNI: ${patientDNI}` });
            }
        }

        // Verify that the doctor with the given DNI exists and has the 'doctor' role
        if (doctorDNI) {
            const doctor = await User.findOne({ DNI: doctorDNI });
            if (!doctor || doctor.role !== 'doctor') {
                return res.status(400).json({ message: `Doctor not found with DNI: ${doctorDNI}` });
            }
        }

        // Update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: `Appointment with ID: ${id} not found` });
        }

        res.status(200).json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (error) {
        console.error(`Error in updating appointment: ${error.message}`);
        res.status(500).json({ message: 'Error updating the appointment', error: error.message });
    }
};

/**
 * Deletes an appointment by ID.
 * @async
 * @function deleteAppointment
 * @memberof module:AppointmentController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.id - The ID of the appointment to delete.
 * @returns {Promise<void>} - Returns a JSON response indicating success or failure.
 */
export const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ success: false, message: `Appointment with ID: ${id} not found` });
        }
        res.status(200).json({ success: true, message: `Appointment with id ${id} deleted successfully` });
    } catch (error) {
        console.error(`Error in deleting appointment: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};