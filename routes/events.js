var express = require("express");
var router = express.Router();
var EventController = require("../controllers/events");

// Routes related to event
router.route("").post(EventController.addEvent);
router.route("").get(EventController.getAllEvents);
router.route("/actors/:actor").get(EventController.getByActor);

module.exports = router;