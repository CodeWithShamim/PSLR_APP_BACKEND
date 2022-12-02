const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");
const verifyToken = require("../../middleware/verifyToken");


router.get("/", verifyToken, postController.getAllPosts);
router.get("/me", verifyToken, postController.getMyPosts);
router.post("/uploadPostImage", verifyToken, postController.uploadPostImage);
router.post("/addPost", verifyToken, postController.addPost);
router.get("/:id", verifyToken, postController.getPost);
router.patch("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.removePost);

module.exports = router;