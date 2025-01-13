import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({success: true, data: users})
    } catch (error){
        console.error(`Error in fetching users: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}

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

export const createUser = async (req, res) => {
    const user = req.body
    if (!user.DNI || !user.name || !user.email || !user.password || !user.role) {
        res.status(400).json({success: false, error: "DNI, name, email, password and role are required fields"})
    }

    const newUser = new User(user)
    try {
        await newUser.save()
        res.status(201).json({success: true, data: newUser})
    } catch (error){
        console.error(`Error in creating user: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}

export const updateUserByDni = async (req, res) => {
    const { dni } = req.params
    const updates = req.body

    if (!updates.DNI || !updates.name || !updates.email || !updates.password || !updates.role) {
        res.status(400).json({success: false, error: "DNI, name, email, password and role are required fields"})
    }

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
