import express from 'express';
import { createQuiz, createQuizzes, getQuizzes, getQuizById, updateQuiz, deleteQuiz } from '../controller/quiz.controller.js';

const router = express.Router();

// Create a new quiz
router.post('/quizzes', createQuiz);

// Bulk create quizzes
router.post('/quizzes/bulk', createQuizzes);

// Get all quizzes
router.get('/quizzes', getQuizzes);

// Get quiz by ID
router.get('/quizzes/:id', getQuizById);

// Update quiz by ID
router.put('/quizzes/:id', updateQuiz);

// Delete quiz by ID
router.delete('/quizzes/:id', deleteQuiz);

export default router;
