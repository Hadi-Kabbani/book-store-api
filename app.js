const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser")
const morgan = require('morgan');

const app = express();

const dotenv = require("dotenv").config();


// Import middleware
const apiErrorHandler = require("./middlewares/apiErrorHandler");
const rateLimiter = require("./middlewares/rateLimiter");
const { connectDB } = require("./middlewares/connection");

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimiter);
app.use(helmet());
app.use(cookieParser());

// Connect to database
connectDB();

// Import routes
const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const wishlistRouter = require("./routes/wishlistRouter");
const cartRouter = require("./routes/cartRouter");
const commentRouter = require("./routes/commentRouter");

// Routes 
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/comments", commentRouter);

// Global error handler
app.use(apiErrorHandler);

// Start server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});
