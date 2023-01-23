const dataBase = require("../models/index");
const log = require("../utils/logger");
const cache = require("../utils/cache");
const validateJSON = require("../middlewares/validateJSON");

const getId = id => /^\d*$/.test(id) ? id : null;

const controllers = {
    createBook: (req, res, next) => {
        const book = req.body;

        dataBase.run(book)
            .then(() => res.status(201).json({
                response: true,
                status: "Created",
                book
            }))
            .catch(err => err.code === "SQLITE_CONSTRAINT"
                ? next(new Error("Title already exists"))
                : next(err.message)
            );
    },

    getAllBooks: (req, res, next) => {
        dataBase.all()
            .then(books => res.status(200).json({
                response: true,
                status: "Ok",
                books: books
            }))
            .catch(err => next(err));
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
    /*

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
                cache.delete(id);
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
                res.status(400).send("Bad Request.");
                return log.error(err.message);
            };
            res.status(200).send("Ok.");
            cache.delete(id);
        });
    } */
};

module.exports = controllers;
