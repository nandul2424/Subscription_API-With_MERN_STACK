// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err); // For debugging in console

    let statusCode = 500;
    let message = "Internal Server Error";

    // 🔹 Handle Mongoose Validation Errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(", ");
    }

    // 🔹 Handle Duplicate Key Error (e.g., unique email)
    else if (err.code && err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue);
        message = `Duplicate value for field: ${field}. Please use another value.`;
    }

    // 🔹 Handle CastError (invalid ObjectId)
    else if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Send the final error response
    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

export default errorHandler;
