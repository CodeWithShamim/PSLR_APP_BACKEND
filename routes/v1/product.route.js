const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const verifyToken = require("../../middleware/verifyToken");

router.post("/addProduct", verifyToken, productController.addProduct);

module.exports = router;