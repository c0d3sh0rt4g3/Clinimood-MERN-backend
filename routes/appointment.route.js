import express from "express";
import {
    deleteAppointment,
    editAppointment,
    getAllAppointments,
    makeAppointment
} from "../controllers/appointment.controller.js";

const router = express.Router()

router.get("/", getAllAppointments)

router.post("/", makeAppointment)

router.put("/:id", editAppointment)

router.delete("/:id", deleteAppointment)

export default router