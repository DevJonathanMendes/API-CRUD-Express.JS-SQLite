const { Database } = require("sqlite3").verbose();
const { existsSync, mkdirSync } = require("fs");
const { error, debug } = require("../utils/logger");

existsSync("source/database") || mkdirSync("source/database");
const sql = new Database(`source/database/books.db`, err =>
    err ? error(err.message)
        : debug(`Database 'books' has been created.`)
);

sql.run(`CREATE TABLE books
    (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL UNIQUE,
        author TEXT NOT NULL,
        pages INTEGER NOT NULL,
        published INTEGER NOT NULL
    );`, err => err
    ? debug("Table 'books' already exists.")
    : debug("Table 'books' has been created.")
);

module.exports = sql;
