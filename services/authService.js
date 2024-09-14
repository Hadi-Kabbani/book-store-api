const { verifyRefreshToken, generateTokens } = require("../utils/tokenUtils");
const apiError = require("../utils/apiError");

// User Logout
exports.logout = async (user) => {
    try {
        user.isActive = false;
        await user.save();
    } catch (error) {
        throw new apiError("Error logging out user", 500);
    }
};

// Refresh Token
exports.refreshToken = (refreshToken) => {

    if (!refreshToken) {
        throw new apiError("Refresh token is required", 400);
    }

    try {
        // Verify the refresh token
        const decoded = verifyRefreshToken(refreshToken);
        const userId = decoded.userId;

        // Generate a new access token
        const { accessToken } = generateTokens(userId)

        return { accessToken };
    } catch (error) {
        next(error);
    }
};
