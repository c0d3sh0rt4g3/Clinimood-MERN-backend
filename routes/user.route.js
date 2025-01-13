import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserByDni,
    getUsersByRole,
    updateUserByDni
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers)

router.get("/:dni", getUserByDni)

router.get("/role/:role", getUsersByRole)

router.post("/", createUser)

router.put("/:dni", updateUserByDni)

router.delete("/:dni", deleteUser)

export default router