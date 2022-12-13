const express = require("express");
const userController = require("../../controllers/user.controller");
const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/uploadImage", verifyToken, userController.uploadImage);
router.post("/updateProfile", verifyToken, userController.updateProfile);

router.get("/getMe", verifyToken, userController.getMe);
router.get("/adminId", verifyToken, userController.getAdminId);
router.get("/:id", verifyToken, userController.getUser);

router.post("/forgotPassword", userController.forgotPassword);
router.post("/updatePassword", userController.updatePassword);

module.exports = router;