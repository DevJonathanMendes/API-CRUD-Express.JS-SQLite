const sql = require("../models/index");
const log = require("../utils/logger");

const throwError = message => {
    throw new Error(message);
};

const getId = id => /^\d*$/.test(id) ? id : null;
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
            })])
            .then(() => res.status(201).send("Created."))
            .catch(message => res.status(400).send(message));
    },

    getAllBooks: (req, res) => {
        const select = "SELECT * FROM books";
        sql.all(select, (err, rows) => {
            if (err) {
                res.status(500).send("Internal Server Error.");
                return log.error(err.message);
            };
            res.status(200).json(rows);
        });
    },

    getBook: (req, res) => {
        const id = getId(req.params.id);
        const select = `SELECT * FROMs books WHERE id=${id}`;

        sql.get(select, (err, rows) => {
            if (err) {
                res.status(500).send("Internal Server Error.");
                return log.error(err.message);
            };
            res.status(200).json(rows || { message: "Book does not exist." })
        });
    },

    patchBook: async (req, res) => {
        Promise.all([
            validateValues(req.body),
            new Promise((resolve, reject) => {
                const id = getId(req.params.id) || reject();
                const set = Object.entries(req.body).map(([key, value]) =>
                    `${key}='${typeof value == "string" ? value.toLowerCase() : value}'`);
                const update = `UPDATE books SET ${set} WHERE id=${id}`;

                db.run(update, err => err ? reject("Title Already Exists.") : resolve());
            })])
            .then(() => res.status(200).send("Ok"))
            .catch(err => res.status(400).send(err.message));
    },

    deleteBook: (req, res) => {
        const id = getId(req.params.id);
        const del = `DELETE FROM books WHERE id=${id}`;

        sql.run(del, err => {
            if (err) {
                res.status(400).send("Bad Request.")
                return log.error(err.message);
            };
            res.status(200).send("Ok.")
        });
    }
};

module.exports = controllers;
