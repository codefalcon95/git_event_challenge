var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("./git_events.db", (err) => {
    if (err) {
        console.log(err.message);
    }
});

module.exports = db;