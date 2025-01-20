import express from "express";
import {
    deleteAppointment,
    editAppointment,
    getAllAppointments,
    getAppointmentsByDNI,
    makeAppointment
} from "../controllers/appointment.controller.js";

const router = express.Router()

router.get("/", getAllAppointments)

router.get("/:dni", getAppointmentsByDNI)

router.post("/", makeAppointment)

router.put("/:id", editAppointment)

router.delete("/:id", deleteAppointment)

export default router