import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables.");
    }

    try {
        
        console.log("Database name:", DATABASE_NAME);

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DATABASE_NAME}?appName=Backend`);
        console.log("Connected to MongoDB!! Host : ", connectionInstance.connection.host, " Port : ", connectionInstance.connection.port);
    } catch (err) {
        console.log("Error in connecting to MongoDB: ", err);
        process.exit(1); // Exit the process with a failure code
    }
};

export default connectDB;