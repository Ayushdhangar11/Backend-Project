import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db/index.js';
import dns from 'dns';
import {app} from './app.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Error in creating server : ", error);
        throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
.catch((error) => {
    console.log("Error : ", error);
    process.exit(1); // Exit the process with a failure code
});





/*
1st approach - using async/await and try/catch block to handle errors and ensure that the server starts only after a successful connection to the database.

An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.
import express from 'express';
const app = express();
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DATABASE_NAME}`);
        console.log("Connected to MongoDB");
        app.on("error", (error) => {
            console.log("Error : ", error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    }catch (error) {
        console.log("Error : ", error);
        throw error;
    }
})()

better approach - go modular approach and separate the database connection logic from the server setup logic. This way, you can handle errors more gracefully and ensure that the server starts only after a successful connection to the database.

*/