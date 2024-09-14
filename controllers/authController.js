const userService = require("../services/userService");
const authService = require("../services/authService");
const passwordService = require("../services/passwordService");

exports.register = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const result = await userService.register(email, password, firstName, lastName);
        res.status(200).json({ isSuccess: true, message: result.message });
    } catch (error) {
        next(error)
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        res.status(200).json({ isSuccess: true, message: result.message });
    } catch (error) {
        next(error)
    }
};

exports.verifyCode = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, purpose, code } = req.body;
        const result = await userService.verifyCode(email, password, firstName, lastName, purpose, code);
        if (purpose === "login") {
            const { accessToken, refreshToken } = result;
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: process.env.REFRESH_TOKEN_MAX_AGE, // 30 days
            });
            res.status(200).json({ isSuccess: true, message: result.message, token: accessToken });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        next(error)
    }
};

exports.logout = async (req, res, next) => {
    try {
        const user = req.user;
        await authService.logout(user);
        res.clearCookie("refreshToken");
        res.set("Authorization", "");
        res.status(200).json({ isSuccess: true, message: "Logged out successfully" });
    } catch (error) {
        next(error)
    }
};

exports.refreshToken = (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const { accessToken } = authService.refreshToken(refreshToken);
        res.status(200).json({ token: accessToken });
    } catch (error) {
        next(error)
    }
};

exports.requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await passwordService.requestPasswordReset(email);
        res.status(200).json({ isSuccess: true, message: result.message });
    } catch (error) {
        next(error)
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const resetToken = req.params.token;
        const { password, confirmPassword } = req.body;
        const result = await passwordService.resetPassword(resetToken, password, confirmPassword);
        res.status(200).json({ isSuccess: true, message: result });
    } catch (error) {
        next(error)
    }
};
