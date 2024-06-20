import express from 'express';
import PostSchool from '../models/PostSchool.js';

const router = express.Router();

// Create a new post school
router.post('/', async (req, res) => {
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

    const savedPostSchool = await newPostSchool.save();
    res.status(201).json(savedPostSchool);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post school', error });
  }
});

// Get all post schools
router.get('/', async (req, res) => {
  try {
    const postSchools = await PostSchool.find();
    res.status(200).json(postSchools);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch post schools', error });
  }
});

export default router;
