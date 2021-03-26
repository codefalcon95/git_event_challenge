var express = require("express");
var router = express.Router();
const ActorController = require("../controllers/actors");
// Routes related to event
router.route("").get(ActorController.getAllActors);
router.route("").put(ActorController.updateActor);
router.route("/streak").get(ActorController.getAllActors);
// Routes related to actor.

module.exports = router;