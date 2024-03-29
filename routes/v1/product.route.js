const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const { authorization } = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", productController.getProducts);
router.get("/getMyProduct", productController.getMyProduct);
router.get("/:status", authorization("admin"), productController.getProductsByStatus);
router.delete("/:id", authorization("admin"), productController.removeProduct);
router.post("/updateProduct", productController.updateProduct);
router.post("/updateProductStatus", authorization("admin"), productController.updateProductStatus);

router.post("/addProduct", productController.addProduct);
router.post("/uploadProductImage", productController.uploadProductImage);

module.exports = router;