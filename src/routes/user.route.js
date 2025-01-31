import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserByDni,
    getUsersByRole, loginUser,
    forgotPassword,
    resetPassword,
    updateUserByDni
} from "../controllers/user.controller.js";

const router = express.Router();

// Routes to each endpoint
router.get("/", getAllUsers)
router.get("/:dni", getUserByDni)
router.get("/role/:role", getUsersByRole)
router.post("/", createUser)
router.put("/:dni", updateUserByDni)
router.delete("/:dni", deleteUser)
router.post("/login", loginUser)

// Password reset routes
router.post("/recover/forgot-password", forgotPassword);
router.post("/recover/reset-password", resetPassword);

export default router