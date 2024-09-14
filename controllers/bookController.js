const bookService = require('../services/bookService');

// Controller for creating a book
exports.createBook = async (req, res, next) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json({
            isSuccess: true,
            data: book
        });
    } catch (error) {
        next(error);
    }
};



// Controller to get a book by ID
exports.getBook = async (req, res, next) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.status(200).json({
            isSuccess: true,
            data: book
        });
    } catch (error) {
        next(error);
    }
};

// Controller to get all books with search functionality
exports.getAllBooks = async (req, res, next) => {
    try {
        const { page, limit, sort, fields, search } = req.query;
        let filter = req.query; // Include pagination, sorting, field selection, and search

        // Exclude fields not used in the query
        ['page', 'sort', 'limit', 'fields', 'search'].forEach(field => delete filter[field]);

        // Search functionality
        const searchCriteria = search ? [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } }
            // Add more search fields as needed
        ] : null;

        const { books, count } = await bookService.getAllBooks(
            filter,
            sort ? sort.split(',').join(' ') : undefined,
            fields ? fields.split(',').join(' ') : undefined,
            parseInt(page, 10) || 1,
            parseInt(limit, 10) || 5,
            searchCriteria
        );

        res.status(200).json({
            isSuccess: true,
            data: books,
            count: count
        });
    } catch (error) {
        next(error);
    }
};



// Controller to update a book
exports.updateBook = async (req, res, next) => {
    try {
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        res.status(200).json({
            isSuccess: true,
            data: updatedBook
        });
    } catch (error) {
        next(error);
    }
};

// Controller to delete a book
exports.deleteBook = async (req, res, next) => {
    try {
        await bookService.deleteBook(req.params.id);
        res.status(200).json({
            isSuccess: true,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
