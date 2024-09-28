import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MongoDBURI;
const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export default connectDB;