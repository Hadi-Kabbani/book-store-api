const Book = require('../models/bookModel');
const apiError = require('../utils/apiError');

// Service for creating a new book
exports.createBook = async (data) => {
    try {
        // Check if the book already exists
        const book = await Book.findOne({ title: data.title });
        if (book) {
            throw new apiError('Book already exists', 400);
        }

        // Create a new book
        const newBook = new Book(data);
        await newBook.save();
        return newBook;
    } catch (error) {
        throw new apiError(error.message || "Something went wrong", error.statusCode || 500);
    }
};

// Service for getting a book by ID
exports.getBookById = async (id) => {
    try {
        const book = await Book.findById(id);
        if (!book) {
            throw new apiError('Book not found', 404);
        }
        return book;
    } catch (error) {
        throw new apiError(error.message || "Something went wrong", error.statusCode || 500);
    }
};

// Service to get all books with pagination, sorting, field selection, and search
exports.getAllBooks = async (filter, sortBy, fields, page, limit, searchCriteria) => {
    try {
        let query = Book.find(filter);

        // Apply search criteria if provided
        if (searchCriteria) {
            query = query.or(searchCriteria);
        }

        if (sortBy) {
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt'); // Default sort order
        }

        if (fields) {
            query = query.select(fields);
        } else {
            query = query.select('-__v'); // Default field exclusion
        }

        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        const books = await query;
        const count = await Book.countDocuments(filter);

        return { books, count };
    } catch (error) {
        throw new apiError(error.message || "Something went wrong", error.statusCode || 500);
    }
};



// Service to update a book
exports.updateBook = async (id, data) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true });
        if (!updatedBook) {
            throw new apiError('Book not found', 404);
        }
        return updatedBook;
    } catch (error) {
        throw new apiError(error.message || "Something went wrong", error.statusCode || 500);
    }
};

// Service to delete a book
exports.deleteBook = async (id) => {
    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            throw new apiError('Book not found', 404);
        }
        return book;
    } catch (error) {
        throw new apiError(error.message || "Something went wrong", error.statusCode || 500);
    }
};
