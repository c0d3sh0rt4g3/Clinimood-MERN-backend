import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Appointment from "./models/Appointment.js";
import History from "./models/History.js";
import {connectDB} from "./db.js";

dotenv.config();

// Function to seed the database only if it is empty
const seedDatabase = async () => {
    try {
        await connectDB();

        // Check if data already exists
        const userCount = await User.countDocuments();
        const appointmentCount = await Appointment.countDocuments();
        const historyCount = await History.countDocuments();

        if (userCount > 0 || appointmentCount > 0 || historyCount > 0) {
            console.log("Database already seeded. Skipping...");
            mongoose.connection.close();
            return;
        }

        // Insert sample users
        const users = await User.insertMany([
            {
                DNI: "12345678A",
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                role: "patient",
                phone: "123456789",
                address: "123 Main St"
            },
            {
                DNI: "87654321B",
                name: "Dr. Smith",
                email: "smith@example.com",
                password: "password123",
                role: "doctor",
                specialization: "Cardiology"
            },
            {
                DNI: "11223344C",
                name: "Jane Doe",
                email: "jane@example.com",
                password: "password123",
                role: "patient",
                phone: "987654321",
                address: "456 Elm St"
            },
            {
                DNI: "55667788D",
                name: "Dr. Adams",
                email: "adams@example.com",
                password: "password123",
                role: "doctor",
                specialization: "Dermatology"
            }
        ]);

        // Insert sample appointments
        const appointments = await Appointment.insertMany([
            {
                patientDNI: "12345678A",
                doctorDNI: "87654321B",
                date: new Date(),
                description: "Routine check-up",
                status: "confirmed"
            },
            {
                patientDNI: "11223344C",
                doctorDNI: "55667788D",
                date: new Date(),
                description: "Skin allergy treatment",
                status: "pending"
            }
        ]);

        // Insert medical history records
        await History.insertMany([
            {
                patientDNI: "12345678A",
                appointmentIdArray: [appointments[0]._id]
            },
            {
                patientDNI: "11223344C",
                appointmentIdArray: [appointments[1]._id]
            }
        ]);

        console.log("Database Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Seeding failed", error);
        process.exit(1);
    }
};

// Run the seeding function
seedDatabase();
