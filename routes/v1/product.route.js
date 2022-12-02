const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const verifyToken = require("../../middleware/verifyToken");

router.get("/", verifyToken, productController.getProducts);
router.post("/addProduct", verifyToken, productController.addProduct);
router.post("/uploadProductImage", verifyToken, productController.uploadProductImage);

router.get("/getReports", verifyToken, productController.getReports);
router.post("/report", verifyToken, productController.reportProduct);

module.exports = router;