const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", productController.getProducts);
router.post("/addProduct", productController.addProduct);
router.post("/uploadProductImage", productController.uploadProductImage);

module.exports = router;