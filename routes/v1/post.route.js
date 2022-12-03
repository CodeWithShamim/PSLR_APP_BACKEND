const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", postController.getAllPosts);
router.get("/me", postController.getMyPosts);
router.post("/uploadPostImage", postController.uploadPostImage);
router.post("/addPost", postController.addPost);
router.get("/:id", postController.getPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.removePost);

module.exports = router;