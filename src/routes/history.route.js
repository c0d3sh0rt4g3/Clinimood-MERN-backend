import express from "express";
import { createMedicalHistory, deleteHistory, getAllHistories } from "../controllers/history.controller.js";

/**
 * Express router for handling medical history-related routes.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route to fetch all medical histories.
 * @name GET /history
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @see {@link module:controllers/history.controller.getAllHistories}
 */
router.get("/", getAllHistories);

/**
 * Route to create a new medical history.
 * @name POST /history
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.patientDNI - DNI of the patient for whom the medical history is being created.
 * @see {@link module:controllers/history.controller.createMedicalHistory}
 */
router.post("/", createMedicalHistory);

/**
 * Route to delete a medical history by patient DNI.
 * @name DELETE /history/:patientDNI
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.patientDNI - DNI of the patient whose medical history is to be deleted.
 * @see {@link module:controllers/history.controller.deleteHistory}
 */
router.delete("/:patientDNI", deleteHistory);

export default router;