const express = require("express");
const router = express.Router();
const messageController = require("../../controllers/message.controller");
const { authorization } = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/:conversationId", messageController.getMessage)
router.post("/addMessage", messageController.addMessage)
router.post("/addMultipleMessage", authorization("admin"), messageController.addMultipleMessage)

module.exports = router;