import express from 'express';
import controller from '../controllers/Book.controller';

const router = express.Router();

router.get('/', controller.readAllBooks);
router.post('/create', controller.createBook);
router.delete('/delete/:bookId', controller.deleteBook);

export default router; 
