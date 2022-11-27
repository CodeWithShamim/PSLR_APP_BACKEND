const errorHandler = (error, req, res, next) => {
    console.log("Global error", error);
    res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;