const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/comment.controller");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", commentController.getAllComments);
router.post("/addComment", commentController.addComment);
router.delete("/:id", commentController.removeComment);

module.exports = router;