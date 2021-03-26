var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./git_events.db", (err) => {
    if (err) {
        console.log(err.message);
    }
});
db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS 'actors' (
        id INT PRIMARY KEY NOT NULL,
        login TEXT DEFAULT "", 
        avatar_url TEXT DEFAULT ""
        )
        `);

    db.run(`CREATE TABLE 'repos' (
            id INT PRIMARY KEY NOT NULL,
            name TEXT DEFAULT "", 
            url TEXT DEFAULT "" 
      ) `);
    db.run(`CREATE TABLE IF NOT EXISTS 'events' (
            id INT PRIMARY KEY NOT NULL,
            type TEXT ,
            actor_id INT,
            repo_id INT,
            created_at  DATE,
            FOREIGN KEY (actor_id)
                REFERENCES actor (actor_id)
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION,
            FOREIGN KEY (repo_id)
                REFERENCES repo (repo_id)
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION
           )`);
});

db.close();