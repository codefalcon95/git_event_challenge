const db = require("../config/db");
const GitEvent = require("../lib/git_events");
const ActorController = {
    getAllActors: async function(req, res) {
        let actors = await GitEvent.getALlActors();
        return res.status(200).json(actors);
    },

    updateActor: async function(req, res) {
        const actor = req.body;

        if (Object.keys(actor).length > 2 || !("avatar_url" in actor)) {
            return res.status(400).json({
                status: "error",
                message: "only avatar_url can be updated",
            });
        }

        let actorExist = await GitEvent.checkActorAlreadyExist(actor);
        if (!actorExist) {
            return res.status(404).json({
                status: "error",
                message: "Actor does not exist",
            });
        }

        let updated = await GitEvent.updateActor(actor.id, actor.avatar_url);
        return res.status(200).json({
            status: "success",
            message: "Avatar updated successfully",
        });
    },

    getStreak: async function(req, res) {
        let actors = await GitEvent.getALlActors();
        return res.status(200).json(actors);
    },
};
module.exports = ActorController;