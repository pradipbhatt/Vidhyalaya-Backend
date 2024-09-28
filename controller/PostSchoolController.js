
import PostSchool from '../model/PostSchool.js';

// Create a new post school
export const createPostSchool = async (req, res) => {
  try {
    const {
      title,
      prices,
      description,
      infrastructure,
      contact,
      location,
      courses,
      rank,
      alumniTotal,
      alumniEngineers,
      alumniDoctors,
      teachers,
      teacherQualifications,
      passoutRate,
      image,
      showMoreUrl
    } = req.body;

    // Log the received data for debugging purposes
    console.log('Received data:', req.body);

    // Create a new instance of PostSchool
    const newPostSchool = new PostSchool({
      title,
      prices,
      description,
      infrastructure,
      contact,
      location,
      courses,
      rank,
      alumniTotal,
      alumniEngineers,
      alumniDoctors,
      teachers,
      teacherQualifications,
      passoutRate,
      image,
      showMoreUrl
    });

    // Save the new post school to the database
    const savedPostSchool = await newPostSchool.save();
    console.log('Saved PostSchool:', savedPostSchool);

    // Respond with the created post school
    res.status(201).json(savedPostSchool);
  } catch (error) {
    console.error('Error creating PostSchool:', error);
    res.status(500).json({ message: 'Failed to create post school', error: error.message });
  }
};

// Get all post schools
export const getPostSchools = async (req, res) => {
  try {
    // Retrieve all post schools from the database
    const postSchools = await PostSchool.find();
    console.log('Fetched PostSchools:', postSchools);

    // Respond with the list of post schools
    res.status(200).json(postSchools);
  } catch (error) {
    console.error('Error fetching PostSchools:', error);
    res.status(500).json({ message: 'Failed to fetch post schools', error: error.message });
  }
};

// Get a single post school by ID
export const getPostSchoolById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find a post school by its ID
    const postSchool = await PostSchool.findById(id);
    if (!postSchool) {
      return res.status(404).json({ message: 'PostSchool not found' });
    }

    // Respond with the found post school
    res.status(200).json(postSchool);
  } catch (error) {
    console.error('Error fetching PostSchool:', error);
    res.status(500).json({ message: 'Failed to fetch post school', error: error.message });
  }
};

// Update a post school by ID
export const updatePostSchool = async (req, res) => {
  try {
    const { id } = req.params;

    // Update a post school by its ID with the provided data
    const updatedPostSchool = await PostSchool.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedPostSchool) {
      return res.status(404).json({ message: 'PostSchool not found' });
    }

    // Respond with the updated post school
    res.status(200).json(updatedPostSchool);
  } catch (error) {
    console.error('Error updating PostSchool:', error);
    res.status(500).json({ message: 'Failed to update post school', error: error.message });
  }
};

// Delete a post school by ID
export const deletePostSchool = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete a post school by its ID
    const deletedPostSchool = await PostSchool.findByIdAndDelete(id);
    if (!deletedPostSchool) {
      return res.status(404).json({ message: 'PostSchool not found' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'PostSchool deleted successfully' });
  } catch (error) {
    console.error('Error deleting PostSchool:', error);
    res.status(500).json({ message: 'Failed to delete post school', error: error.message });
  }
};
