import express from 'express';
import { createQuizResult, getQuizResults, getQuizResultById, deleteQuizResultById } from '../controller/quizResult.controller.js';

const router = express.Router();

router.post('/quiz-results', createQuizResult);
router.get('/quiz-results', getQuizResults);
router.get('/quiz-results/:id', getQuizResultById);
router.delete('/quiz-results/:id', deleteQuizResultById); // New route for delete operation

export default router;
