const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/comment.controller");
const verifyToken = require("../../middleware/verifyToken");

router.get("/", verifyToken, commentController.getAllComments);
router.post("/addComment", verifyToken, commentController.addComment);
router.delete("/:id", verifyToken, commentController.removeComment);

module.exports = router;