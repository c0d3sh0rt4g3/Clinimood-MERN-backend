import express from "express";
import {getAllAppointments, makeAppointment} from "../controllers/appointment.controller.js";

const router = express.Router()

router.get("/", getAllAppointments)

router.post("/", makeAppointment)

router.put("/:appointmentId", makeAppointment)

export default router