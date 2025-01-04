const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

async function connectToDatabase() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports = { connectToDatabase };
