import express from 'express';
import {
  createPostSchool,
  getPostSchools,
  getPostSchoolById,
  updatePostSchool,
  deletePostSchool
} from '../controller/PostSchoolController.js'; // Import controller functions

const router = express.Router();

// Create a new post school
router.post('/', createPostSchool);

// Get all post schools
router.get('/', getPostSchools);

// Get a single post school by ID
router.get('/:id', getPostSchoolById);

// Update a post school by ID
router.put('/:id', updatePostSchool);

// Delete a post school by ID
router.delete('/:id', deletePostSchool);

export default router;
// tested successfully