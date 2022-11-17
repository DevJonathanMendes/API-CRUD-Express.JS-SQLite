const sqlite3 = require("sqlite3").verbose();
const { existsSync, mkdirSync } = require("fs");
const { debug } = require("../utils/logger");

existsSync("source/database")
    ? debug("Pasta já existe.")
    : mkdirSync("source/database");

const db = new sqlite3.Database("./source/database/books.db", err => {
    if (err) debug(err.message);
});

const startDatabase = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE books
            (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL UNIQUE,
                author TEXT NOT NULL,
                pages INTEGER NOT NULL,
                published INTEGER NOT NULL
            );`,
            err => err ? debug("Tabela já existe.")
                : debug("Tabela criada.")
        );

        const insert = "INSERT INTO books (title, author, pages, published) VALUES (?, ?, ?, ?)";
        const books = [
            ['c++: como programar', 'deitel', 1208, 2006],
            ['código limpo', 'robert c. martin', 425, 2009],
            ['javascript: o guia definitivo', 'david flanagan', 1080, 2012],
            ['padrões javascript', 'david flanagan', 340, 2010]
        ];

        books.forEach((book) =>
            db.run(insert, book, err =>
                err ? debug(`Livro já existe: ${book[0]}`)
                    : debug(`Livro criado: ${book[0]}`))
        );
    });
};

module.exports = { db, startDatabase };
