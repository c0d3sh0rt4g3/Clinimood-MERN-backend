import express from "express";
import {getAllHistories} from "../controllers/history.controller.js";

const router = express.Router();

router.get("/", getAllHistories)

export default router;