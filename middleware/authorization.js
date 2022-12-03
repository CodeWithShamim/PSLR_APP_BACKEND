module.exports.authorization = (...role) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!userRole) {
            return res.status(404).json({
                success: false,
                message: "User not find."
            })
        }
        if (!role.includes(userRole)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access."
            })
        }
        next();
    }
};