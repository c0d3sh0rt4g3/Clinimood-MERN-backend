import express from "express";
import {createMedicalHistory, deleteHistory, getAllHistories} from "../controllers/history.controller.js";

const router = express.Router();

router.get("/", getAllHistories)

router.post("/", createMedicalHistory)

router.delete("/:patientDNI", deleteHistory)

export default router;