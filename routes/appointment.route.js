import express from "express";
import {editAppointment, getAllAppointments, makeAppointment} from "../controllers/appointment.controller.js";

const router = express.Router()

router.get("/", getAllAppointments)

router.post("/", makeAppointment)

router.put("/:id", editAppointment)

export default router