import express from "express";
import {createMedicalHistory, getAllHistories} from "../controllers/history.controller.js";

const router = express.Router();

router.get("/", getAllHistories)

router.post("/", createMedicalHistory)

export default router;