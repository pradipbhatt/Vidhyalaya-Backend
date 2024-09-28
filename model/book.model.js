import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  bookTitle: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdTime: { type: Date, default: Date.now },
  image: { type: String, required: true },
  pdfLink: { type: String, required: true },
  faculty: { 
    type: String, 
    required: true,
    enum: ['Civil', 'Computer'] // Restricting the faculty field to only these values
  },
  semester: { type: String, required: true }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
