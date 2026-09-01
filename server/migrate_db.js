const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'data', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS blocks");
    db.run("DROP TABLE IF EXISTS inquiries");
    db.run("DROP TABLE IF EXISTS cabins");
    console.log("Tables dropped. Run the server to recreate them.");
});

db.close();
