const jwt = require("jsonwebtoken");
const { promisify } = require("util");


module.exports.generateToken = async (userInfo) => {
    try {
        const payload = {
            email: userInfo.email,
            role: userInfo.role,
        };

        const token = await promisify(jwt.sign)(payload, process.env.TOKEN_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        res.status(403).json({
            success: false,
            error: error.message
        });
    }
};