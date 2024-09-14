const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Fetch user from the database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    // Check if user is Active
    if (!user.isActive) {
      return res.status(401).json({ error: "User is not Active" });
    }

    // Check if password was changed after the token was issued
    if (user.passwordChangedAt) {
      const passwordChangedAtTimestamp = parseInt(
        user.passwordChangedAt.getTime() / 1000
      );

      if (passwordChangedAtTimestamp > decoded.iat) {
        return res
          .status(401)
          .json({ error: "Password changed recently. Please login again." });
      }
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Invalid token or user not authenticated",
      message: err.message,
    });
  }
};

module.exports = authenticate;
