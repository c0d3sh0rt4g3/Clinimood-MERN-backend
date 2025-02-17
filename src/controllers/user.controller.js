import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

/**
 * Controller for handling user-related operations.
 * @module UserController
*/

/**
 * Fetches all users from the database.
 * @async
 * @function getAllUsers
 * @memberOf module:UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON response with the list of users or an error message.
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error(`Error in fetching users: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Fetches a user by their DNI.
 * @async
 * @function getUserByDni
 * @memberOf module:UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.dni - The DNI of the user to fetch.
 * @returns {Promise<void>} - Returns a JSON response with the user data or an error message.
 */
export const getUserByDni = async (req, res) => {
    const { dni } = req.params;
    try {
        const user = await User.findOne({ DNI: dni });
        if (!user) {
            return res.status(404).json({ success: false, error: `User with DNI ${dni} not found` });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(`Error in fetching user: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Fetches all users with a specific role.
 * @async
 * @function getUsersByRole
 * @memberOf module:UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.role - The role to filter users by.
 * @returns {Promise<void>} - Returns a JSON response with the list of users or an error message.
 */
export const getUsersByRole = async (req, res) => {
    const { role } = req.params;

    if (!role) return res.status(400).json({ success: false, error: `Role parameter is required` });

    try {
        const users = await User.find({ role });
        if (!users) {
            return res.status(404).json({ success: false, error: `Users with role ${role} not found` });
        }
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error(`Error in fetching users: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Creates a new user with the provided data.
 * @async
 * @function createUser
 * @memberOf module:UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.DNI - DNI of the user.
 * @param {string} req.body.name - Name of the user.
 * @param {string} req.body.email - Email of the user.
 * @param {string} req.body.password - Password of the user.
 * @param {string} req.body.role - Role of the user.
 * @returns {Promise<void>} - Returns a JSON response with the created user or an error message.
 */
export const createUser = async (req, res) => {
    const user = req.body;
    if (!user.DNI || !user.name || !user.email || !user.password || !user.role) {
        res.status(400).json({ success: false, error: "DNI, name, email, password, and role are required fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = new User({
        ...user,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error(`Error in creating user: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Updates a user by their DNI.
 * @async
 * @function updateUserByDni
 * @memberOf module:UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.dni - The DNI of the user to update.
 * @param {Object} req.body - The updates to apply to the user.
 * @returns {Promise<void>} - Returns a JSON response with the updated user or an error message.
 */
export const updateUserByDni = async (req, res) => {
    const { dni } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ DNI: dni }, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, error: `User with DNI ${dni} not found` });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error(`Error in updating user: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Deletes a user by their DNI.
 * @async
 * @function deleteUser
 * @memberOf module:UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.dni - The DNI of the user to delete.
 * @returns {Promise<void>} - Returns a JSON response indicating success or failure.
 */
export const deleteUser = async (req, res) => {
    const { dni } = req.params;
    try {
        const deletedUser = await User.findOneAndDelete({ DNI: dni });
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(`Error in deleting user: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Logs in a user with the provided email and password.
 * @async
 * @function loginUser
 * @memberOf module:UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.email - Email of the user.
 * @param {string} req.body.password - Password of the user.
 * @returns {Promise<void>} - Returns a JSON response with the user data or an error message.
 */
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, error: "Invalid password" });
        }
        res.status(200).json({ success: true, message: "Login successful", data: user });
    } catch (error) {
        console.error(`Error in login: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Sends a password reset token to the user's email.
 * @async
 * @function forgotPassword
 * @memberOf module:UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.email - Email of the user.
 * @returns {Promise<void>} - Returns a JSON response indicating success or failure.
 */
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    dotenv.config();

    if (!email) {
        return res.status(400).json({ success: false, error: "Email is required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = await bcrypt.hash(resetToken, 10);
        user.resetPasswordExpires = Date.now() + 600000;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "clinimood@gmail.com",
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            to: email,
            from: "clinimood@gmail.com",
            subject: "Password Reset",
            text: `Use the following token to reset your password: ${resetToken}\n\n` +
                  `This token will expire in 1 hour.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Password reset token sent to email" });
    } catch (error) {
        console.error(`Error in forgot password: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Resets the user's password using the provided token.
 * @async
 * @function resetPassword
 * @memberOf module:UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.email - Email of the user.
 * @param {string} req.body.token - Password reset token.
 * @param {string} req.body.newPassword - New password for the user.
 * @returns {Promise<void>} - Returns a JSON response indicating success or failure.
 */
export const resetPassword = async (req, res) => {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
        return res.status(400).json({ success: false, error: "Email, token, and new password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
            return res.status(400).json({ success: false, error: "Invalid or expired token" });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ success: false, error: "Token expired" });
        }

        const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);

        if (!isTokenValid) {
            return res.status(400).json({ success: false, error: "Invalid token" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error(`Error in resetting password: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
};