const Wishlist = require("../models/wishListModel");
const apiError = require('../utils/apiError');

// Service to create a wishlist
exports.createWishlist = async (userId) => {
    try {
        const wishlist = await Wishlist.create({ userId });
        return wishlist;
    } catch (error) {
        throw error;
    }
};

// Service to get a wishlist by user ID
exports.getWishlistByUserId = async (userId) => {
    try {
        const wishlist = await Wishlist.findOne({ userId }).populate('books');
        if (!wishlist) {
            throw new apiError('Wishlist not found', 404);
        }
        return wishlist;
    } catch (error) {
        throw error;
    }
};

// Service to add a book to a wishlist
exports.addBookToWishlist = async (userId, bookId) => {
    try {
        const wishlist = await Wishlist.findOneAndUpdate(
            { userId },
            { $addToSet: { books: bookId } },
            { new: true }
        ).populate('books');
        if (!wishlist) {
            throw new apiError('Wishlist not found', 404);
        }
        return wishlist;
    } catch (error) {
        throw error;
    }
};

// Service to remove a book from a wishlist
exports.removeBookFromWishlist = async (userId, bookId) => {
    try {
        const wishlist = await Wishlist.findOneAndUpdate(
            { userId },
            { $pull: { books: bookId } },
            { new: true }
        ).populate('books');
        if (!wishlist) {
            throw new apiError('Wishlist not found', 404);
        }
        return wishlist;
    } catch (error) {
        throw error;
    }
};
