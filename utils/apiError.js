class apiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;  // Ensure this is always a number
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error'; // 'fail' or 'error' for JSON responses
    }
}

module.exports = apiError;
