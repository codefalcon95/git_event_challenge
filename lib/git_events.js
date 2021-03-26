const { resolve, reject } = require("bluebird");
const db = require("../config/db");
const GitEvent = {
    async checkRepoAlreadyExist(repo, callback) {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*)  as the_data FROM repos WHERE id = ${repo.id}`;
            db.get(query, (err, doc) => {
                if (!err) {
                    resolve(doc.the_data >= 1);
                }
                reject(err);
            });
        });
    },
    addRepo(repo) {
        let query = `INSERT INTO repos (id,name,url) VALUES (?,?,?)`;
        return new Promise((resolve, reject) => {
            db.run(query, [repo.id, repo.name, repo.url], (err, doc) => {
                if (err) {
                    return 0;
                }
                return doc;
            });
        });
    },
    async checkActorAlreadyExist(actor) {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*) AS the_data FROM actors WHERE id = ${actor.id}`;

            db.get(query, (err, doc) => {
                if (!err) {
                    resolve(doc.the_data >= 1);
                }
                reject(err);
            });
        });
    },
    addActor(actor) {
        let query = `INSERT INTO actors (id,login,avatar_url) VALUES (?,?,?)`;
        db.run(query, [actor.id, actor.login, actor.avatar_url], (err, doc) => {
            if (err) {
                console.log(err);
                return false;
            }
            return doc;
        });
    },
    checkEventAlreadyExist(event) {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*) as the_data FROM events WHERE id = ${event.id}`;
            db.get(query, (err, doc) => {
                if (!err) {
                    resolve(doc.the_data >= 1);
                }
                reject(err);
            });
        });
    },
    addEvent(data) {
        query = `INSERT INTO events (id,type,actor_id,repo_id,created_at) VALUES (?,?,?,?,?)`;
        db.run(
            query, [data.id, data.type, data.actor.id, data.repo.id, data.created_at],
            function(err, rows) {
                if (err) {
                    console.log(err);
                    return false;
                }
                return rows;
            }
        );
    },

    eraseEvent() {
        query = `DELETE FROM events`;
        db.run(query, function(err, rows) {
            if (err) {
                console.log(err);
                return false;
            }
            return rows;
        });
    },

    getAllEvents() {
        return new Promise((resolve, reject) => {
            let query = `SELECT events.id as id, events.created_at,
            events.type as type, actors.id as actor_id,
            actors.login as login, actors.avatar_url as avatar_url,
            repos.id as repo_id, repos.name as name, repos.url as url
            FROM events 
            LEFT JOIN actors ON events.actor_id = actors.id
            LEFT JOIN repos ON events.repo_id = repos.id order by events.id asc`;
            db.all(query, (err, doc) => {
                console.log(err);
                console.log(doc);

                if (!err) {
                    resolve(doc);
                }
                resolve([]);
            });
        });
    },

    getEventByActor(actorId) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM events 
            INNER JOIN actors ON events.actor_id = actors.id
            LEFT JOIN repos ON events.repo_id = repos.id
            WHERE actors.id = ${actorId}`;
            db.all(query, (err, doc) => {
                console.log(err);
                console.log(doc);

                if (!err) {
                    resolve(doc);
                }
                resolve([]);
            });
        });
    },

    getALlActors() {
        return new Promise((resolve, reject) => {
            let query = ` SELECT actors.*, COUNT(events.id) as number_of_events FROM actors INNER JOIN events ON actors.id = events.actor_id GROUP BY actors.id ORDER BY number_of_events DESC, events.created_at DESC,actors.login ASC`;
            db.all(query, (err, doc) => {
                if (!err) {
                    resolve(doc);
                }
                resolve([]);
            });
        });
    },

    updateActor(actor_id, avatar_url) {
        return new Promise((resolve, reject) => {
            query = `UPDATE actors SET avatar_url =?
        WHERE id = ${actor_id}`;
            db.run(query, [avatar_url], function(err, rows) {
                if (!err) {
                    resolve(rows);
                }
                reject({});
            });
        });
    },

    getStreak() {},
};

module.exports = GitEvent;