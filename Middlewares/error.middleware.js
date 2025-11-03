export default (err, req, res, next) => {
    console.error("Error middleware:", err.message);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Internal Server Error",
    });
};
