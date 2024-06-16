// Importing required modules
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import PostRoutes from './routes/Post.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Use post routes for all requests starting with /api/post/
app.use('/api/post', PostRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  console.error(`Error: ${message}`);
  console.error(err);
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Route to handle root URL GET requests
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello developers from Vidhayalaya',
  });
});

// Function to connect to MongoDB
const connectDB = () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => {
      console.error('Failed to connect with MongoDB');
      console.error(err);
      process.exit(1);
    });
};

// Function to start the server
const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.error('Error starting the server');
    console.error(error);
    process.exit(1);
  }
};

startServer();
