const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./source/database/books.db", err => {
    if (err) throw new Error(err.message);
});

db.run(
    `CREATE TABLE IF NOT EXISTS books
    (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL UNIQUE,
        author TEXT NOT NULL,
        pages INTEGER NOT NULL,
        published INTEGER NOT NULL
    );`
    , err => { if (err) throw new Error(err.message); });

module.exports = db;