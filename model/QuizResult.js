import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    engineeringField: {
        type: String,
        required: true,
        enum: ['Computer', 'Civil', 'Architecture']
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    solvedQuestions: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;
