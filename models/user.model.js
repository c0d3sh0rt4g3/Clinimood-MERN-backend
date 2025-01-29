import mongoose from "mongoose";

// User DB schema
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

    // Stores the hashed reset token
    resetPasswordToken: String,
    // Stores the expiration time of the token
    resetPasswordExpires: Date

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
