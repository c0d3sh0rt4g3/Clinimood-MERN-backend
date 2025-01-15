import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // Importa el middleware CORS
import userRoutes from "./routes/user.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import historyRoutes from "./routes/history.route.js";

dotenv.config();

const app = express();
app.use(express.json());

// Configure CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/history', historyRoutes);

app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
});