// Importing required modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRoutes from './routes/User.js';
import PostRoutes from './routes/Post.js';
import PostSchoolRoutes from './routes/PostSchool.js'; // Importing PostSchool routes

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize Express application

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json({ limit: '50mb' })); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests

// Define routes
app.use('/api/user', UserRoutes); // Define route for User API
app.use('/api/post', PostRoutes); // Define route for Post API
app.use('/api/postschool', PostSchoolRoutes); // Define route for PostSchool API

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello developers from Vidhyalaya',
  });
});

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

const startServer = async () => {
  try {
    await connectDB(); // Connect to the database
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.error('Error starting server', error);
  }
};

startServer();
