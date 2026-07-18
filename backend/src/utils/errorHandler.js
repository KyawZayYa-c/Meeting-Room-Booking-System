const { errorFile, DTime } = require('./errorHelper');

// Global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log error to file
    const errorLog = {
        message: message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        query: req.query,
        params: req.params,
        user: req.user ? req.user._id : null,
        timestamp: DTime.dateTime(),
    };

    errorFile.write(errorLog);

    // Send response
    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

// Custom error class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Not found error handler
const notFoundHandler = (req, res, next) => {
    const error = new AppError(`Route not found: ${req.originalUrl}`, 404);
    next(error);
};

module.exports = {
    globalErrorHandler,
    AppError,
    notFoundHandler,
};