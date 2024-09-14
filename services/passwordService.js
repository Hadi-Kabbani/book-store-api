const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { generatePasswordResetToken } = require("../utils/tokenUtils");
const { sendPasswordResetEmail } = require("../utils/emailUtils");
const { hashPassword } = require("../utils/passwordUtils");
const apiError = require("../utils/apiError");

// Request Password Reset
exports.requestPasswordReset = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new apiError("You don't have an account", 404);
        }

        const resetToken = generatePasswordResetToken(user._id);
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        await user.save();

        await sendPasswordResetEmail(user.email, resetToken);

        return { message: "Check your email" };
    } catch (error) {
        throw error;
    }
};

// Reset Password
exports.resetPassword = async (resetToken, password, confirmPassword) => {
    try {
        if (!resetToken || !password || !confirmPassword) {
            throw new apiError("New password, and confirm password are required", 400);
        }

        if (password !== confirmPassword) {
            throw new apiError("Passwords do not match", 400);
        }

        const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user || user.passwordResetExpires < Date.now() || user.passwordResetToken !== resetToken) {
            throw new apiError("Reset password token is invalid or expired", 400);
        }

        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.passwordChangedAt = Date.now();

        await user.save();
        return { message: "Password updated successfully" };
    } catch (error) {
        throw error;
    }
};
