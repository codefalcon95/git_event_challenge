const db = require("../config/db");
const GitEvent = require("../lib/git_events");
const EventController = {
    getAllEvents: async function(req, res) {
        let all_events = await GitEvent.getAllEvents();
        return res.status(200).json(all_events);
    },
    addEvent: async function(req, res) {
        //create and actor
        try {
            let actor = req.body.actor;
            let repo = req.body.repo;
            let data = req.body;

            //create repo
            let actorExist = await GitEvent.checkActorAlreadyExist(actor);

            let repoCheck = await GitEvent.checkRepoAlreadyExist(repo);

            let eventCheck = await GitEvent.checkEventAlreadyExist(data);
            if (eventCheck) {
                return res.status(400).json({
                    status: "error",
                    message: "Event already exists",
                });
            }

            if (!actorExist) GitEvent.addActor(actor);
            if (!repoCheck) GitEvent.addRepo(repo);
            GitEvent.addEvent(data);

            return res.status(201).json({
                status: "success",
                message: "Event created successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                status: "error",
                message: error,
            });
        }
    },
    getByActor: async function(req, res) {
        const actor_id = req.params.actor;
        let all_events = await GitEvent.getEventByActor(actor_id);
        return res.status(all_events.length > 0 ? 200 : 404).json(all_events);
    },
    eraseEvents: async function(req, res) {
        GitEvent.eraseEvent();
        return res.status(200).json({
            status: "success",
            message: "Deleted successfully",
        });
    },
};

module.exports = EventController;