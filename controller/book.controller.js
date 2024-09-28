import Book from "../model/book.model.js";

// Get all books with optional faculty filter
const getBook = async (req, res) => {
  try {
    const { faculty } = req.query; // Extract faculty from query parameters
    const filter = {};

    if (faculty) {
      filter.faculty = faculty; // Add faculty filter if provided
    }

    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a book by title with optional faculty filter
const getBookByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const { faculty } = req.query; // Extract faculty from query parameters
    const filter = { bookTitle: title };

    if (faculty) {
      filter.faculty = faculty; // Add faculty filter if provided
    }

    const book = await Book.findOne(filter);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing book by ID
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(deletedBook);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { getBook, getBookByTitle, addBook, updateBook, deleteBook };
