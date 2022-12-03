const express = require("express");
const router = express.Router();
const lapController = require("../../controllers/lap.controller");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", lapController.getLaps);
router.post("/addLap", lapController.addLap);

module.exports = router;