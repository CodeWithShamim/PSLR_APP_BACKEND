const express = require("express");
const router = express.Router();
const conversationController = require("../../controllers/conversation.controller");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/:userId", conversationController.getConvByUser)
router.get("/find/:firstUserId/:secondUserId", conversationController.getConvByTwoUser)
router.post("/addConversation", conversationController.addConversation)

module.exports = router;