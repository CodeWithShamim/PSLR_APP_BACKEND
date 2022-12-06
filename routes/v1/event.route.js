const express = require("express");
const router = express.Router();
const eventController = require("../../controllers/event.controller");
const { authorization } = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken)

router.get("/", eventController.getEvents);
router.post("/addEvent", authorization("admin"), eventController.addEvent)

module.exports = router;