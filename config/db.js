// config/db.js

import mongoose from 'mongoose';

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
      throw new Error('MONGODB_URL is not defined in environment variables');
    }
    await mongoose.connect(uri); // No options needed for newer MongoDB drivers
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
