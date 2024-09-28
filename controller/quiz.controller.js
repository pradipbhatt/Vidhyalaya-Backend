import Quiz from '../model/quiz.model.js';

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    const savedQuiz = await quiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Bulk create quizzes
const createQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.insertMany(req.body); // Assumes req.body is an array of quizzes
    res.status(201).json(quizzes);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all quizzes or by year
const getQuizzes = async (req, res) => {
  try {
    let query = {};

    if (req.query.yearID) {
      query.yearID = req.query.yearID; // Assuming 'yearID' is the field in your Quiz model
    }

    const quizzes = await Quiz.find(query);
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get quiz by ID
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update quiz by ID
const updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete quiz by ID
const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id.trim(); // Trim any whitespace characters
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(deletedQuiz);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Export all controller functions
export { createQuiz, createQuizzes, getQuizzes, getQuizById, updateQuiz, deleteQuiz };
