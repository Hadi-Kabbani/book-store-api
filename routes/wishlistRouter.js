const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.use(authenticate);

router.post('/', wishlistController.createWishlist);
router.get('/', wishlistController.getWishlist);
router.post('/books', wishlistController.addBookToWishlist);
router.delete('/books', wishlistController.removeBookFromWishlist);

module.exports = router;
