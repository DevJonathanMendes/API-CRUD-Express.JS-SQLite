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
            this.db.run(insert, function (err) {
                if (err)
                    return err.code === "SQLITE_CONSTRAINT"
                        ? reject(new Error("Title already exists"))
                        : reject("Unable to update book.");

                return resolve(this.lastID);
            }));
    };

    all() {
        return new Promise((resolve, reject) =>
            this.db.all("SELECT * FROM books", (err, rows) =>
                err ? reject("Unable to return all books.")
                    : resolve(rows)));
    };

    get(id) {
        return new Promise((resolve, reject) =>
            this.db.get(`SELECT * FROM books WHERE id=${id}`, (err, book) =>
                err ? reject("Could not find the book.") : resolve(book))
        );
    };

    patch(id, { book, transformedBook }) {
        return new Promise((resolve, reject) => {
            this.get(id).then(foundBook => {
                if (!foundBook) return resolve("The book does not exist.");

                return this.db.run(`UPDATE books SET ${transformedBook} WHERE id=${id}`, err => {
                    if (err) return err.code === "SQLITE_CONSTRAINT"
                        ? reject(new Error("Title already exists"))
                        : reject("Unable to update book.");

                    return resolve({ id, ...book });
                });
            }).catch(err => reject(err));
        });
    };

    delete(id) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM books WHERE id=${id}`, err => {
                return err
                    ? reject("Unable to delete the book.")
                    : resolve("The book has been deleted.");
            });
        });
    };
};

const dataBase = new DataBase();

module.exports = dataBase; 
