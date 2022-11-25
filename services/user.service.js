const User = require("../models/User");

// sign up 
module.exports.signupService = async (userInfo) => {
  return await User.create(userInfo);
}

// login 
module.exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// update profile
module.exports.updateProfileService = async (updateInfo) => {
  const { email, bio, description, profilePicture, fbURL, instagramURL, twitterURL, twitchURL } = updateInfo;

  const result = await User.updateOne({ email }, {
    $set: {
      bio,
      description,
      profilePicture,
      fbURL,
      instagramURL,
      twitterURL,
      twitchURL,
    }
  });
  return result;
};

// update by email 
module.exports.updatePasswordByEmail = async (data) => {
  return await User.updateOne({ email: data.email }, { $set: { password: data.hashPassword } });
};

// add pin 
module.exports.addPinByEmail = async (data) => {
  return await User.updateOne({ email: data.email }, { $set: { pin: data.pin } });
};

// remove pin 
module.exports.removePinByEmail = async (data) => {
  return await User.updateOne({ email: data.email }, { $unset: { pin: "" } });
};