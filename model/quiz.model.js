import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [{
    text: String,
    correct: Boolean,
  }],
  explanation: String,
  yearID: Number,
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
