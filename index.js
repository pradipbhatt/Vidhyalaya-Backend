// Importing necessary modules
import express from 'express'; // Import Express to create and manage the server
import dotenv from 'dotenv'; // Import dotenv to load environment variables from a .env file
import cors from 'cors'; // Import CORS middleware to handle Cross-Origin Resource Sharing
import connectDB from './config/db.js'; // Import the function to connect to the database
import UserRoutes from './routes/User.js'; // Import the routes for User-related API endpoints
import PostRoutes from './routes/Post.js'; // Import the routes for Post-related API endpoints
import PostSchoolRoutes from './routes/PostSchool.js'; // Import the routes for PostSchool-related API endpoints

// Load environment variables from the .env file into process.env
dotenv.config();

// Initialize an Express application
const app = express();

// Middleware to enable Cross-Origin Resource Sharing (CORS) 
app.use(cors()); // This allows your API to be accessed from different origins (useful for front-end and back-end separation)

// Middleware to parse incoming JSON requests
app.use(express.json({ limit: '50mb' })); // This sets a limit for JSON request bodies (default limit is 1mb)

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true })); // This allows parsing of data from forms or URL query strings

// Define API routes
app.use('/api/user', UserRoutes); // Route for handling user-related API requests
app.use('/api/post', PostRoutes); // Route for handling post-related API requests
app.use('/api/postschool', PostSchoolRoutes); // Route for handling PostSchool-related API requests

// Error handling middleware
app.use((err, req, res, next) => {
  // This middleware will catch any errors that occur in the application
  const status = err.status || 500; // Default to 500 if status is not provided
  const message = err.message || 'Something went wrong'; // Default error message
  res.status(status).json({
    success: false, // Indicate that the request was not successful
    status, // Send the HTTP status code
    message, // Send the error message
  });
});

// Define a basic route for the root URL
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello developers from Vidhyalaya', // Simple message for the root URL
  });
});

// Function to start the server and connect to the database
const startServer = async () => {
  try {
    await connectDB(); // Connect to the database
    app.listen(8080, () => console.log('Server started on port 8080')); // Start the server on port 8080
  } catch (error) {
    console.error('Error starting server', error); // Log any errors that occur during server startup
  }
};

// Call the function to start the server
startServer();
