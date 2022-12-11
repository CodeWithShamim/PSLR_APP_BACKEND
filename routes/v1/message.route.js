const express = require("express");
const router = express.Router();
const messageController = require("../../controllers/message.controller");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/:senderId/:conversationId", messageController.getMessage)
router.post("/addMessage", messageController.addMessage)

module.exports = router;