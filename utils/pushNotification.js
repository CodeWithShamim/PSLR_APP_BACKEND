const admin = require("firebase-admin");
var serviceAccount = require("../plsr-mobile-app-firebase-adminsdk-v5n4n-d3f989a786.json");
const User = require("../models/User");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = async (notification, ref = "all") => {
  let users;
  if (ref === "all") {
    users = await User.find();
  } else {
    if (ref.ref_type == "id") {
      users = await User.findById(ref.ref);
    } else {
      users = await User.find({ reference: ref.ref });
    }
  }
  const tokens = users.map((user) => user?.fcm_token).filter(Boolean);
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
