const express = require("express");
const router = express.Router();
const lapController = require("../../controllers/lap.controller");
const verifyToken = require("../../middleware/verifyToken");

router.get("/", verifyToken, lapController.getLaps);
router.post("/addLap", verifyToken, lapController.addLap);

module.exports = router;