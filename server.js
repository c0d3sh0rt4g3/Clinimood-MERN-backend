import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import express from "express";

const app = express()
app.use(express.json());
dotenv.config();

app.listen(5000, () => {
    connectDB()
    console.log('Server started at http://localhost:5000');
});