import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserByDni,
    getUsersByRole,
    loginUser,
    forgotPassword,
    resetPassword,
    updateUserByDni
} from "../controllers/user.controller.js";

/**
 * Express router for handling user-related routes.
 * @module UserRouter
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route to fetch all users.
 * @name GET /users
 * @function
 * @memberof module:UserRouter
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @see {@link module:controllers/user.controller.getAllUsers}
 */
router.get("/", getAllUsers);

/**
 * Route to fetch a user by their DNI.
 * @name GET /users/:dni
 * @function
 * @memberOf module:UserRouter
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.dni - The DNI of the user to fetch.
 * @see {@link module:controllers/user.controller.getUserByDni}
 */
router.get("/:dni", getUserByDni);

/**
 * Route to fetch all users with a specific role.
 * @name GET /users/role/:role
 * @function
 * @memberOf module:UserRouter
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.role - The role to filter users by.
 * @see {@link module:controllers/user.controller.getUsersByRole}
 */
router.get("/role/:role", getUsersByRole);

/**
 * Route to create a new user.
 * @name POST /users
 * @function
 * @memberOf module:UserRouter
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.DNI - DNI of the user.
 * @param {string} req.body.name - Name of the user.
 * @param {string} req.body.email - Email of the user.
 * @param {string} req.body.password - Password of the user.
 * @param {string} req.body.role - Role of the user.
 * @see {@link module:controllers/user.controller.createUser}
 */
router.post("/", createUser);

/**
 * Route to update a user by their DNI.
 * @name PUT /users/:dni
 * @function
 * @memberOf module:UserRouter
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.dni - The DNI of the user to update.
 * @param {Object} req.body - The updates to apply to the user.
 * @see {@link module:controllers/user.controller.updateUserByDni}
 */
router.put("/:dni", updateUserByDni);

/**
 * Route to delete a user by their DNI.
 * @name DELETE /users/:dni
 * @function
 * @memberOf module:UserRouter
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.dni - The DNI of the user to delete.
 * @see {@link module:controllers/user.controller.deleteUser}
 */
router.delete("/:dni", deleteUser);

/**
 * Route to log in a user.
 * @name POST /users/login
 * @function
 * @memberOf module:UserRouter
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.email - Email of the user.
 * @param {string} req.body.password - Password of the user.
 * @see {@link module:controllers/user.controller.loginUser}
 */
router.post("/login", loginUser);

/**
 * Route to send a password reset token to the user's email.
 * @name POST /users/recover/forgot-password
 * @function
 * @memberOf module:UserRouter
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.email - Email of the user.
 * @see {@link module:controllers/user.controller.forgotPassword}
 */
router.post("/recover/forgot-password", forgotPassword);

/**
 * Route to reset the user's password using a token.
 * @name POST /users/recover/reset-password
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.email - Email of the user.
 * @param {string} req.body.token - Password reset token.
 * @param {string} req.body.newPassword - New password for the user.
 * @see {@link module:controllers/user.controller.resetPassword}
 */
router.post("/recover/reset-password", resetPassword);

export default router;