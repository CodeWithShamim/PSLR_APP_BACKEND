const admin = require("firebase-admin");
var serviceAccount = require("../plsr-mobile-app-firebase-adminsdk-v5n4n-d3f989a786.json");
const User = require("../models/User");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = async (notification, to = "all") => {
  let tokens = [to];
  if (to === "all") {
    const users = await User.find();
    tokens = users.map((user) => user?.fcm_token);
  }
  const message = {
    notification,
    tokens,
  };

  admin
    .messaging()
    .sendMulticast(message)
    .then((res) => {
      console.log("send success");
    })
    .catch((err) => {
      console.log(err);
    });
};