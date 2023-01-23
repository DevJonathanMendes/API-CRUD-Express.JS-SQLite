require("dotenv/config")
const { Database } = require("sqlite3").verbose();
const { existsSync, mkdirSync } = require("fs");
const { error, debug } = require("../utils/logger");

existsSync("source/database") || mkdirSync("source/database");

const createDB = () => process.env.NODE_ENV === "production"
    ? new Database(`source/database/books.db`, err =>
        err ? error(err.message) : debug("Database for production was created."))
    : new Database(`source/database/books-temp.db`, err =>
        err ? error(err.message) : debug("Database for temp was created."));

class DataBase {
    constructor() {
        this.db = createDB();

        this.db.run(`CREATE TABLE books
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
    };

    run(book) {
        const { title, author, pages, published } = book;
        const columns = "title, author, pages, published";
        const values = `'${title.toLowerCase()}', '${author.toLowerCase()}', ${pages}, ${published}`;
        const insert = `INSERT INTO books (${columns}) VALUES (${values});`;

        return new Promise((resolve, reject) =>
            this.db.run(insert, err => err ? reject(err) : resolve())
        )
    };

    all() {
        return new Promise((resolve, reject) =>
            this.db.all("SELECT * FROM books", (err, rows) =>
                err ? reject("Unable to return all books.") : resolve(rows))
        )
    };
};

const dataBase = new DataBase();

module.exports = dataBase; 
