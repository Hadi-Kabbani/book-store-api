const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");
const { registerValidationMiddleware, passwordValidationMiddleware } = require("../middlewares/validation");

// User Registration
router.post("/register", registerValidationMiddleware, authController.register);

// User Login
router.post("/login", authController.login);

// User Logout
router.post("/logout", authenticate, authController.logout);

// Verify Login and register Code
router.post("/verify-code", authController.verifyCode);

// Request Password Reset
router.post("/reset-password/request", authController.requestPasswordReset);

// Reset Password
router.post("/reset-password/reset/:token", passwordValidationMiddleware, authController.resetPassword);

// Refresh Token
router.post("/refresh-token", authenticate, authController.refreshToken);

module.exports = router;
