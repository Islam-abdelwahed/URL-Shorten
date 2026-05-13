import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import { ShortenRouter } from "./routes/shorten.js";
const app = express();
app.use(express.json());
app.use("/shorten", ShortenRouter);
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
    }
    catch (error) {
        console.log(error);
    }
    app.listen(process.env.PORT, () => {
        console.log("listening on port 3000");
    });
};
start();
