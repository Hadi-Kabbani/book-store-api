const wishlistService = require('../services/wishlistService');

// Controller to create a wishlist
exports.createWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistService.createWishlist(req.user._id);
        res.status(201).json({
            isSuccess: true,
            data: wishlist
        });
    } catch (error) {
        next(error);
    }
};

// Controller to get a wishlist by user ID
exports.getWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistService.getWishlistByUserId(req.user._id);
        res.status(200).json({
            isSuccess: true,
            data: wishlist
        });
    } catch (error) {
        next(error);
    }
};

// Controller to add a book to a wishlist
exports.addBookToWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistService.addBookToWishlist(req.user._id, req.body.bookId);
        res.status(200).json({
            isSuccess: true,
            data: wishlist
        });
    } catch (error) {
        next(error);
    }
};

// Controller to remove a book from a wishlist
exports.removeBookFromWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistService.removeBookFromWishlist(req.user._id, req.body.bookId);
        res.status(200).json({
            isSuccess: true,
            data: wishlist
        });
    } catch (error) {
        next(error);
    }
};
