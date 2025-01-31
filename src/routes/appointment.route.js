import express from "express";
import {
    deleteAppointment,
    editAppointment,
    getAllAppointments,
    getAppointmentsByDNI,
    makeAppointment
} from "../controllers/appointment.controller.js";

/**
 * Express router for handling appointment-related routes.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route to fetch all appointments.
 * @name GET /appointments
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @see {@link module:controllers/appointment.controller.getAllAppointments}
 */
router.get("/", getAllAppointments);

/**
 * Route to fetch appointments by DNI (either patientDNI or doctorDNI).
 * @name GET /appointments/:dni
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.dni - The DNI to search for.
 * @see {@link module:controllers/appointment.controller.getAppointmentsByDNI}
 */
router.get("/:dni", getAppointmentsByDNI);

/**
 * Route to create a new medical appointment.
 * @name POST /appointments
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.patientDNI - DNI of the patient.
 * @param {string} req.body.doctorDNI - DNI of the doctor.
 * @param {Date} req.body.date - Date and time of the appointment.
 * @param {string} [req.body.description] - Optional description of the appointment.
 * @param {string} [req.body.status] - Status of the appointment (default: 'pending').
 * @see {@link module:controllers/appointment.controller.makeAppointment}
 */
router.post("/", makeAppointment);

/**
 * Route to update an existing appointment by ID.
 * @name PUT /appointments/:id
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.id - The ID of the appointment to update.
 * @param {Object} req.body - The updates to apply to the appointment.
 * @param {string} [req.body.patientDNI] - New DNI of the patient.
 * @param {string} [req.body.doctorDNI] - New DNI of the doctor.
 * @param {Date} [req.body.date] - New date and time of the appointment.
 * @param {string} [req.body.description] - New description of the appointment.
 * @param {string} [req.body.status] - New status of the appointment.
 * @see {@link module:controllers/appointment.controller.editAppointment}
 */
router.put("/:id", editAppointment);

/**
 * Route to delete an appointment by ID.
 * @name DELETE /appointments/:id
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.id - The ID of the appointment to delete.
 * @see {@link module:controllers/appointment.controller.deleteAppointment}
 */
router.delete("/:id", deleteAppointment);

export default router;