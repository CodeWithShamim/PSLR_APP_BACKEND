const express = require("express");
const userController = require("../../controllers/user.controller")
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/updatePassword", userController.updatePassword);

module.exports = router;