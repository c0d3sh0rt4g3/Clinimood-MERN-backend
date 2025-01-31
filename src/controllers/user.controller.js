import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

// Gets all DB users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({success: true, data: users})
    } catch (error){
        console.error(`Error in fetching users: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}

// Get the user that has the specified DNI
export const getUserByDni = async (req, res) => {
    const { dni } = req.params
    try {
        const user = await User.findOne({DNI : dni})
        if (!user) {
            return res.status(404).json({success: false, error: `User with dni ${dni} not found`})
        }
        res.status(200).json({success: true, data: user})
    } catch (error){
        console.error(`Error in fetching user: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}

// Gets all users with a certain role
export const getUsersByRole = async (req, res) => {
    const { role } = req.params

    if (!role) return res.status(400).json({success: false, error: `Role parameter is required`})

    try {
        const user = await User.find({role})
        if (!user) {
            return res.status(404).json({success: false, error: `Users with role ${role} not found`})
        }
        res.status(200).json({success: true, data: user})
    } catch (error){
        console.error(`Error in fetching user: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}

// Creates a user with the given data, encrypting its password first
export const createUser = async (req, res) => {
    const user = req.body
    if (!user.DNI || !user.name || !user.email || !user.password || !user.role) {
        res.status(400).json({success: false, error: "DNI, name, email, password and role are required fields"})
    }

    // We generate a salt thanks to bcrypt library
    const salt = await bcrypt.genSalt(10)
    // We hash the password along with the salt
    const hashedPassword = await bcrypt.hash(user.password, salt)

    const newUser = new User({
        ...user,
        password: hashedPassword
    })

    try {
        await newUser.save()
        res.status(201).json({success: true, data: newUser})
    } catch (error){
        console.error(`Error in creating user: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}

//Updates users with the specified DNI
export const updateUserByDni = async (req, res) => {
    const { dni } = req.params
    const updates = req.body

    try {
        const updatedUser = await  User.findOneAndUpdate({DNI : dni}, updates, {new : true})

        if (!updatedUser) {
            return res.status(404).json({success: false, error: `User with dni ${dni} not found`})
        }

        res.status(200).json({success: true, data: updatedUser})
    } catch (error){
        console.error(`Error in updating user: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}

// Deletes the specified user
export const deleteUser = async (req, res) => {
    const { dni } = req.params
    try {
        const deletedUser = await User.findOneAndDelete({ DNI: dni })
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' })
    } catch (error) {
        console.error(`Error in deleting user: ${error.message}`)
        res.status(500).json({ success: false, error: error.message })
    }
}

// Verify if the data introduced y correct to log in
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required" })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" })
        }

        // We compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password)

        // If the password is incorrect, it returns an error
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, error: "Invalid password" })
        }
        res.status(200).json({success: true, message: "Login successful", data: user})
    } catch (error) {
        console.error(`Error in login: ${error.message}`)
        res.status(500).json({ success: false, error: error.message })
    }
}

// Sends password reset token via email
export const forgotPassword = async (req, res) => {
    const { email } = req.body

    dotenv.config()

    if (!email) {
        return res.status(400).json({ success: false, error: "Email is required" })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex")
        user.resetPasswordToken = await bcrypt.hash(resetToken, 10)
        // Last 10 minutes
        user.resetPasswordExpires = Date.now() + 600000
        await user.save()

        // Send email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "clinimood@gmail.com",
                pass: process.env.MAIL_PASSWORD,
            },
        })

        const mailOptions = {
            to: email,
            from: "clinimood@gmail.com",
            subject: "Password Reset",
            text: `Use the following token to reset your password: ${resetToken}\n\n` +
                  `This token will expire in 1 hour.`
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({ success: true, message: "Password reset token sent to email" })
    } catch (error) {
        console.error(`Error in forgot password: ${error.message}`)
        res.status(500).json({ success: false, error: error.message })
    }
}

// Resets password using token
export const resetPassword = async (req, res) => {
    const { email, token, newPassword } = req.body

    if (!email || !token || !newPassword) {
        return res.status(400).json({ success: false, error: "Email, token, and new password are required" })
    }

    try {
        const user = await User.findOne({ email })

        if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
            return res.status(400).json({ success: false, error: "Invalid or expired token" })
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ success: false, error: "Token expired" })
        }

        const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken)

        if (!isTokenValid) {
            return res.status(400).json({ success: false, error: "Invalid token" })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        await user.save()

        res.status(200).json({ success: true, message: "Password reset successfully" })
    } catch (error) {
        console.error(`Error in resetting password: ${error.message}`)
        res.status(500).json({ success: false, error: error.message })
    }
}