const express = require("express");
const router = express.Router();
const productLinkController = require("../../controllers/productLink.controller");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", productLinkController.getAllProductLinks);
router.post("/addToWishList", productLinkController.addProductLink);
router.delete("/:id", productLinkController.removeProductLink);

module.exports = router;