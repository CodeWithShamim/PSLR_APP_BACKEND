const User = require("../models/User");

module.exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
}