const db = require("../models/index");

const errorJson = message => {
    return {
        "error": message,
        "example": {
            "title": {
                Type: "String",
                minSize: 2,
                maxSize: 64
            },
            "author": {
                Type: "String",
                minSize: 2,
                maxSize: 64
            },
            "pages": {
                Type: "Number",
                minSize: 1,
                maxSize: 5
            },
            "published": {
                Type: "Number",
                minSize: 4,
                maxSize: 4
            }
        }
    };
};

const throwError = message => {
    throw new Error(message);
};

const validateValues = book => {
    return new Promise((resolve, reject) => {
        try {
            Object.keys(book).forEach(item => {
                switch (item) {
                    case "id":
                        throwError("You cannot set the ID.");
                        break;
                    case "title":
                        if (!/^[\d\D]{2,64}$/.test(book[item])) {
                            throwError("Invalid Title.");
                        }; break;
                    case "author":
                        if (!/^[\d\D]{2,64}$/.test(book[item])) {
                            throwError("Invalid Author.");
                        }; break;
                    case "pages":
                        if (!/^\d{1,5}$/.test(book[item])) {
                            throwError("Invalid Pages.");
                        }; break;
                    case "published":
                        if (!/^\d{4}$/.test(book[item])) {
                            throwError("Invalid Published.");
                        }; break;
                    default: throwError("Invalid JSON.");
                };
            });
            resolve();
        } catch (err) {
            reject(err.message);
        };
    });
};

const controllers = {
    createBook: async (req, res) => {
        Promise.all([
            validateValues(req.body),
            new Promise((resolve, reject) => {
                const { title, author, pages, published } = req.body;
                const columns = "title, author, pages, published";
                const values = `'${title.toLowerCase()}', '${author.toLowerCase()}', ${pages}, ${published}`;
                const insert = `INSERT INTO books (${columns}) VALUES (${values});`;

                db.run(insert, err => err ? reject("Title Already Exists.") : resolve());
            })
        ])
            .then(() => res.status(201).send("OK"))
            .catch(message => res.status(400).send(errorJson(message)));
    },
    getAllBooks: async (req, res) => {
        new Promise((resolve, reject) => {
            const select = "SELECT * FROM books";

            db.all(select, (err, rows) =>
                err ? reject() : resolve(rows));
        })
            .then(rows => res.status(200).send(rows))
            .catch(() => res.status(404).send("Not Found."));
    },
    deleteBook: async (req, res) => {
        new Promise((resolve, reject) => {
            const del = `DELETE FROM books WHERE id=${req.params.id}`;

            db.run(del, err => err ? reject(err) : resolve("Ok."));
        })
            .then(message => res.status(200).send(message))
            .catch(err => res.status(400).send(err.message));
    }
};

module.exports = controllers;