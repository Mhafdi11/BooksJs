import mongoose, { Document, Schema } from 'mongoose';
import { Status, Format } from '../shared/Enum';

export interface BookDocument extends Document {
    title: string;
    author: string;
    numberOfPages: number;
    status: Status;
    price: number;
    numberOfPagesRead: number;
    format: Format;
    suggestedBy: string;
    finished: boolean;
    calculateReadingProgress(): number; 
}

const bookSchema = new Schema<BookDocument>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    numberOfPages: { type: Number, required: true },
    status: { type: String, enum: Object.values(Status), required: true },
    price: { type: Number, required: true },
    numberOfPagesRead: { type: Number, required: true },
    format: { type: String, enum: Object.values(Format), required: true },
    suggestedBy: { type: String, required: true },
    finished: { type: Boolean, required: true }
});

bookSchema.methods.calculateReadingProgress = function(this: BookDocument) {
    return (this.numberOfPagesRead / this.numberOfPages) * 100;
};

bookSchema.pre('save', function(next) {
    if (this.numberOfPagesRead === this.numberOfPages) {
        this.finished = true;
    }
    next();
});

const Book = mongoose.model<BookDocument>('Book', bookSchema);

class BookModel {
    private _model: mongoose.Model<BookDocument>;

    constructor() {
        this._model = Book;
    }

    async deleteBook(bookId: string) {
        try {
            const deletedBook = await this._model.findByIdAndDelete(bookId);
            return deletedBook;
        } catch (error) {
            throw new Error('Failed to delete book');
        }
    }

    currentlyAt(book: BookDocument) {
        return (book.numberOfPagesRead / book.numberOfPages) * 100;
    }

    getModel() {
        return this._model;
    }
}

export default BookModel;
