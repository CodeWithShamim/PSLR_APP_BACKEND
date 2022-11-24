const User = require("../models/User");

// sign up 
module.exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
}

// login 
module.exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};