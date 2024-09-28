import express from "express";
import { getBook, addBook, updateBook, deleteBook } from "../controller/book.controller.js";

const router = express.Router();

router.get('/getBook', getBook);
router.post('/addBook', addBook);
router.delete('/deleteBook/:id', deleteBook);
router.put('/updateBook/:id', updateBook);

export default router;
