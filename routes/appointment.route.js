import express from "express";
import {getAllAppointments, makeAppointment} from "../controllers/appointment.controller.js";

const router = express.Router()

router.get("/", getAllAppointments)
router.post("/", makeAppointment)

export default router