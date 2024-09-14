const express = require('express');
const bookController = require('../controllers/bookController');
const Book = require('../models/bookModel');
const { query } = require("../middlewares/query")
const router = express.Router();

router.post('/', bookController.createBook);
router.get('/:id', bookController.getBook);
router.get('/', query(Book), bookController.getAllBooks);
router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
