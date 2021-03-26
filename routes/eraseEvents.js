var express = require("express");
var router = express.Router();
var EventController = require("../controllers/events");

// Route related to delete events
router.route("").delete(EventController.eraseEvents);

module.exports = router;