import mongoose from "mongoose";

/**
 * User DB schema.
 * @typedef {Object} UserSchema
 * @property {string} DNI - DNI of the user (required, unique).
 * @property {string} name - Name of the user (required).
 * @property {string} email - Email of the user (required, unique).
 * @property {string} password - Password of the user (required).
 * @property {string} role - Role of the user. Must be one of: 'patient', 'doctor', 'admin' (required).
 * @property {string} [phone] - Phone number of the user (optional).
 * @property {string} [address] - Address of the user (optional).
 * @property {string} [specialization] - Specialization of the user (optional, typically for doctors).
 * @property {string} [profilePicture] - URL or path to the user's profile picture (optional).
 * @property {string} [resetPasswordToken] - Hashed token for password reset (optional).
 * @property {Date} [resetPasswordExpires] - Expiration time for the password reset token (optional).
 * @property {Date} createdAt - Timestamp of when the user was created (automatically added).
 * @property {Date} updatedAt - Timestamp of when the user was last updated (automatically added).
 */
const userSchema = new mongoose.Schema({
    DNI: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        required: true
    },
    phone: String,
    address: String,
    specialization: String,
    profilePicture: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

/**
 * Mongoose model for the User schema.
 * @type {mongoose.Model<UserSchema>}
 */
const User = mongoose.model('User', userSchema);

export default User;