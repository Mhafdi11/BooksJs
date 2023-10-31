import express from 'express';
import controller from '../controllers/Book.controller';

const router = express.Router();

// router.get('/:bookId', controller.readBook);
router.get('/', controller.readAllBooks);
router.post('/create', controller.createBook);
// router.put('/update/:bookId', controller.updateBook);
router.delete('/delete/:bookId', controller.deleteBook);

export default router; // Using ES6 default export syntax
