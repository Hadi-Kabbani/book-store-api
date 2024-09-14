const apiErrorHandler = (err, req, res, next) => {
    // Ensure statusCode is numeric, default to 500 if not set
    const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;

    res.status(statusCode).json({
        status: err.status,  // "fail" or "error"
        message: err.message,
    });
};

module.exports = apiErrorHandler;
