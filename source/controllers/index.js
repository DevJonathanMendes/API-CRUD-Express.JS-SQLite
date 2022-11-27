const sql = require("../models/index");
const log = require("../utils/logger");
const cache = require("../utils/cache");
const { validateJSON, getId } = require("../utils/utils");

const controllers = {
    createBook: (req, res) => {
        try {
            validateJSON(req.body);
            const { title, author, pages, published } = req.body;
            const columns = "title, author, pages, published";
            const values = `'${title.toLowerCase()}', '${author.toLowerCase()}', ${pages}, ${published}`;
            const insert = `INSERT INTO books (${columns}) VALUES (${values});`;

            sql.run(insert, err => {
                if (err) {
                    if (err.code == "SQLITE_CONSTRAINT") {
                        return res.status(400).send("Title already exists.");
                    };
                    res.status(500).send("Internal Server Error.");
                    return log.error(err.message);
                };
                res.status(201).send("Created.");
            });
        } catch (err) {
            res.status(400).send(err.message);
        };
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
        const bookCache = cache.get(id);

        if (bookCache) {
            return res.status(200).json(bookCache);
        };

        const select = `SELECT * FROM books WHERE id=${id}`;
        sql.get(select, (err, rows) => {
            if (err) {
                res.status(500).send("Internal Server Error.");
                log.error(err.message);
            } else if (rows) {
                res.status(200).json(rows);
                cache.set(id, rows);
            } else
                res.status(204).send("No Content.");
        });
    },

    patchBook: (req, res) => {
        try {
            validateJSON(req.body);
            const id = getId(req.params.id);
            const set = Object.entries(req.body).map(([key, value]) =>
                `${key}='${typeof value == "string" ? value.toLowerCase() : value}'`);
            const update = `UPDATE books SET ${set} WHERE id=${id}`;

            sql.run(update, err => {
                if (err) {
                    res.status(500).send("Internal Server Error.");
                    return log.error(err.message);
                };
                res.status(200).send("Ok.");
            });
        } catch (err) {
            res.status(400).send(err.message);
        };
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
