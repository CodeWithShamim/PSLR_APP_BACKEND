const express = require("express");
const router = express.Router();
const reportController = require("../../controllers/report.controller");
const verifyToken = require("../../middleware/verifyToken");

router.get("/", verifyToken, reportController.getReports);
router.post("/reportProduct", verifyToken, reportController.reportProduct)

module.exports = router;