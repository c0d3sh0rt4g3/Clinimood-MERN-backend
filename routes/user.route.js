import express from "express";
import {createUser, deleteUser, getAllUsers, getUserByDni} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers)

router.get("/:dni", getUserByDni)

router.post("/", createUser)

router.delete("/:dni", deleteUser)

export default router