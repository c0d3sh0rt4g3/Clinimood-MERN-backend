import History from "../models/history.model.js"

// Get all histories
export const getAllHistories = async (req, res) => {
    try {
        const histories = await History.find({})
        res.status(200).json({success:true, data: histories})
    } catch (error) {
        console.error(`Error in fetching appointments: ${error.message}`)
        res.status(500).json({success: false, error: error.message})
    }
}