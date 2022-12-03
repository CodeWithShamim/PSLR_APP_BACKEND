const express = require("express");
const router = express.Router();
const reportController = require("../../controllers/report.controller");
const { authorization } = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", authorization("admin"), reportController.getReports);
router.post("/reportProduct", reportController.reportProduct)

module.exports = router;