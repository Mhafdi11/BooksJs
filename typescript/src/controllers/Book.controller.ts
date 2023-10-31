import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../models/Book";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const {
        title,
        author,
        numberOfPages,
        status,
        price,
        numberOfPagesRead,
        format,
        suggestedBy,
        finished
    } = req.body;

    const bookModel = new Book().getModel();
    const book = await bookModel.create(req.body);

    return book.save()
        .then((book) => res.status(201).json({ book }))
        .catch(error => res.status(500).json({ error }));
}

// const readBook = (req: Request, res: Response, next: NextFunction) => {
//     const bookId = req.params.bookId;

//     return Book.findById(bookId)
//         .then((book) => book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' }))
//         .catch(error => res.status(500).json({ error }));
// }

const readAllBooks = (req: Request, res: Response, next: NextFunction) => {
    const bookModel = new Book().getModel();
    return bookModel.find()
        .then((books) => res.status(200).json({ books }))
        .catch(error => res.status(500).json({ error }));
}

// const updateBook = (req: Request, res: Response, next: NextFunction) => {
//     const bookId = req.params.bookId;

//     return Book.findByIdAndUpdate(bookId, req.body, { new: true })
//         .then((book) => {
//             if (book) {
//                 res.status(200).json({ book });
//             } else {
//                 res.status(404).json({ message: 'Not found' });
//             }
//         })
//         .catch(error => res.status(500).json({ error }));
// }

const deleteBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId; // Assuming you're passing the book ID via the request URL
        const book = new Book();
        const deletedBook = await book.deleteBook(bookId);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error});
    }
}
export default {
    createBook,
    // readBook,
    readAllBooks,
    // updateBook,
    deleteBook
}
