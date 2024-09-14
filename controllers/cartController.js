const cartService = require('../services/cartService');

// Controller to create a cart
exports.createCart = async (req, res, next) => {
    try {
        const cart = await cartService.createCart(req.user._id, req.body.items);
        res.status(201).json({
            isSuccess: true,
            data: cart,
        });
    } catch (error) {
        next(error); 
    }
};


// Controller to get a cart by user ID
exports.getCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCartByUserId(req.params.userId);
        res.status(200).json({
            isSuccess: true,
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to add an item to the cart
exports.addItemToCart = async (req, res, next) => {
    try {
        const cart = await cartService.addItemToCart(req.params.userId, req.body.bookId, req.body.quantity);
        res.status(200).json({
            isSuccess: true,
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to update item quantity in the cart
exports.updateItemQuantity = async (req, res, next) => {
    try {
        const cart = await cartService.updateItemQuantity(req.params.userId, req.body.bookId, req.body.quantity);
        res.status(200).json({
            isSuccess: true,
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to remove an item from the cart
exports.removeItemFromCart = async (req, res, next) => {
    try {
        const cart = await cartService.removeItemFromCart(req.params.userId, req.body.bookId);
        res.status(200).json({
            isSuccess: true,
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};
