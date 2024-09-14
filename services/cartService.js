const Cart = require('../models/cartModel');
const apiError = require('../utils/apiError');

// Utility function to find and populate a cart
const findAndPopulateCart = async (userId) => {
    return await Cart.findOne({ userId })
        .populate("userId")
        .populate("items.bookId");
};

// Service to create a cart
exports.createCart = async (userId, items) => {
    try {
        // Validation checks
        if (!userId) throw new apiError('User ID is required', 400);

        if (!Array.isArray(items) || items.length === 0) throw new apiError('Books must be an array with at least one item', 400);

        // Check if cart already exists
        const existingCart = await Cart.findOne({ userId });
        if (existingCart) throw new apiError('Cart already exists', 409);

        // Create new cart
        const cart = new Cart({
            userId,
            items: items.map(book => ({
                bookId: book.bookId,
                quantity: book.quantity || 1,
            }))
        });

        // Save cart and return
        await cart.save();
        return await findAndPopulateCart(userId);
    } catch (error) {
        throw error;
    }
};



// Service to get a cart by user ID
exports.getCartByUserId = async (userId) => {
    try {
        const cart = await findAndPopulateCart(userId);
        if (!cart) throw new apiError('Cart not found', 404);
        return cart;
    } catch (error) {
        throw error;
    }
};

// Service to add an item to the cart
exports.addItemToCart = async (userId, bookId, quantity) => {
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) throw new apiError('Cart not found', 404);

        if (!quantity) quantity = 1;

        const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId.toString());
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ bookId, quantity });
        }

        await cart.save();
        return await findAndPopulateCart(userId);
    } catch (error) {
        throw error;
    }
};

// Service to update item quantity in the cart
exports.updateItemQuantity = async (userId, bookId, quantity) => {
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) throw new apiError('Cart not found', 404);

        const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId.toString());
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
        } else {
            throw new apiError('Item not found in cart', 404);
        }

        return await findAndPopulateCart(userId);
    } catch (error) {
        throw error;
    }
};

// Service to remove an item from the cart
exports.removeItemFromCart = async (userId, bookId) => {
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) throw new apiError('Cart not found', 404);

        cart.items = cart.items.filter(item => item.bookId.toString() !== bookId.toString());
        await cart.save();

        return await findAndPopulateCart(userId);
    } catch (error) {
        throw error;
    }
};
