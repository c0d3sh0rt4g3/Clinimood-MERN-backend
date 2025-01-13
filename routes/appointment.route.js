import express from "express";
import {getAllAppointments} from "../controllers/appointment.controller.js";

const router = express.Router()

router.get("/appointments", getAllAppointments)

export default router