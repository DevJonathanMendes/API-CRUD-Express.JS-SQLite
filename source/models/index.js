const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./source/database/books.db", err => {
    if (err) throw new Error(err.message);
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS books
        (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL UNIQUE,
            author TEXT NOT NULL,
            pages INTEGER NOT NULL,
            published INTEGER NOT NULL
        );`);

    const insert = "INSERT INTO books (title, author, pages, published) VALUES (?, ?, ?, ?)"
    db.run(insert, ['c++: como programar', 'deitel', 1208, 2006]);
    db.run(insert, ['código limpo', 'robert c. martin', 425, 2009]);
    db.run(insert, ['javascript: o guia definitivo', 'david flanagan', 1080, 2012]);
    db.run(insert, ['padrões javascript', 'david flanagan', 340, 2010]);
});

module.exports = db;