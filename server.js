import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import historyRoutes from "./routes/history.route.js";

const app = express()
app.use(express.json());
dotenv.config();

app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes)
app.use('/history', historyRoutes)

app.listen(5000, () => {
    connectDB()
    console.log('Server started at http://localhost:5000');
});