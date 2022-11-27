const sql = require("../models/index");
const { validateJSON, getId } = require("../utils/utils");
const log = require("../utils/logger");

const controllers = {
    createBook: async (req, res) => {
        Promise.all([
            validateJSON(req.body),
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
