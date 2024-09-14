const express = require('express');
const cartController = require('../controllers/cartController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

// Apply authentication only for the routes that require it
router.use(authenticate);

// Define routes
router.post('/', cartController.createCart);
router.get('/:userId', cartController.getCart);
router.post('/:userId/items', cartController.addItemToCart);
router.patch('/:userId/items', cartController.updateItemQuantity);
router.delete('/:userId/items', cartController.removeItemFromCart);

module.exports = router;
