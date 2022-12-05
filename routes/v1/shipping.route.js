const express = require("express");
const router = express.Router();
const shippingController = require("../../controllers/shipping.controller");
const { authorization } = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", authorization("admin"), shippingController.getShipping);
router.post("/addShipping", shippingController.addShipping)
router.post("/updateShippingStatus", authorization("admin"), shippingController.updateShippingStatus)

module.exports = router;