const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const dbPath = path.resolve(dataDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Initialize tables
        db.serialize(() => {
            // Cabins table
            db.run(`CREATE TABLE IF NOT EXISTS cabins (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )`);

            // Insert default cabins if not exists
            db.get("SELECT COUNT(*) AS count FROM cabins", (err, row) => {
                if (row && row.count === 0) {
                    const stmt = db.prepare("INSERT INTO cabins (name) VALUES (?)");
                    stmt.run("Pokój z łóżkiem King-Size");
                    stmt.run("Pokój trzyosobowy");
                    stmt.run("Pokój trzyosobowy typu Basic");
                    stmt.run("Pokój czteroosobowy");
                    stmt.run("Pokój pięcioosobowy");
                    stmt.finalize();
                }
            });

            // Blocks table (reservations and manual blocks)
            db.run(`CREATE TABLE IF NOT EXISTS blocks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cabin_id INTEGER NOT NULL,
                start_date TEXT NOT NULL, -- YYYY-MM-DD
                end_date TEXT NOT NULL,   -- YYYY-MM-DD
                reason TEXT,              -- 'reservation', 'maintenance', etc.
                inquiry_id INTEGER,       -- null if manual block
                FOREIGN KEY(cabin_id) REFERENCES cabins(id)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cabin_id INTEGER,
                start_date TEXT,
                end_date TEXT,
                guest_name TEXT,
                guest_email TEXT,
                guest_phone TEXT,
                message TEXT,
                pets BOOLEAN DEFAULT 0,
                breakfast BOOLEAN DEFAULT 0,
                dinner BOOLEAN DEFAULT 0,
                total_price REAL,
                status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'rejected'
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);
        });
    }
});

module.exports = db;
