const jwt = require("jsonwebtoken");
const apiError = require("../utils/apiError");
// Function to generate access and refresh tokens
const generateTokens = (userId) => {
    try {
        if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
            throw new Error("JWT secrets are not defined in environment variables");
        }

        const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.EXPIRES_IN_ACCESS,
        });

        const refreshToken = jwt.sign(
            { userId },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.EXPIRES_IN_REFRESH,
            }
        );

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError("Error generating tokens", 500);
    }
};


// Function to generate a password reset token
const generatePasswordResetToken = (userId) => {
    try {
        if (!process.env.RESET_TOKEN_SECRET) {
            throw new Error(
                "RESET_TOKEN_SECRET is not defined in environment variables"
            );
        }

        // Generate a token for password reset, valid for 1 hour
        return jwt.sign({ userId }, process.env.RESET_TOKEN_SECRET, {
            expiresIn: process.env.EXPIRES_IN_RESET,
        });
    } catch (error) {
        throw new apiError("Error generating password reset token", 500);
    }
};

// Function to verify refresh token
const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new apiError("Invalid refresh token", 401);
    }
};

module.exports = { generateTokens, generatePasswordResetToken, verifyRefreshToken };
