import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import historyRoutes from "./routes/history.route.js";
import seedDatabase from "../src/config/seed.js";

dotenv.config();

const app = express();
app.use(express.json());

// Allowed origins
const allowedOrigins = [
    "https://clinimood-mern-frontend.vercel.app",
    "http://localhost:5173",
    "http://localhost:5000"
];

// Configure CORS
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/history', historyRoutes);

app.listen(5000, async () => {
    await connectDB();
    await seedDatabase();
    console.log('Server started at http://localhost:5000');
});
