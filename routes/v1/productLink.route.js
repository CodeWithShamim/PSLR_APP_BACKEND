const express = require("express");
const router = express.Router();
const productLinkController = require("../../controllers/productLink.controller");
const verifyToken = require("../../middleware/verifyToken");

router.get("/", verifyToken, productLinkController.getAllProductLinks);
router.post("/addToWishList", verifyToken, productLinkController.addProductLink);

module.exports = router;