const jwt = require("jsonwebtoken");
const { promisify } = require("util");


module.exports.generateToken = async (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
    };

    const token = await promisify(jwt.sign)(payload, process.env.TOKEN_SECRET, { expiresIn: "7d" });
    return token;
};