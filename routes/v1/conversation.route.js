const express = require("express");
const router = express.Router();
const conversationController = require("../../controllers/conversation.controller");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", conversationController.getConversations)
router.post("/addConversation", conversationController.addConversation)

module.exports = router;