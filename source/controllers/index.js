const db = require("../models/index");

const testId = id => /^\d*$/.test(id);
const getId = id => testId(id) ? id : false;

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
            })])
            .then(() => res.status(201).send("Created."))
            .catch(message => res.status(400).send(message));
    },
    getAllBooks: async (req, res) => {
        new Promise((resolve, reject) => {
            const select = "SELECT * FROM books";

            db.all(select, (err, rows) =>
                err ? reject() : resolve(rows));
        })
            .then(rows => res.status(200).send(rows || "Not Found."))
            .catch(() => res.status(404).send("Not Found."));
    },
    getBook: async (req, res) => {
        new Promise((resolve, reject) => {
            const id = getId(req.params.id) || reject();
            const select = `SELECT * FROM books WHERE id=${id}`;

            db.get(select, (err, rows) =>
                err ? reject() : resolve(rows));
        })
            .then(rows => res.status(200).send(rows || "Not Found."))
            .catch(() => res.status(404).send("Not Found."));
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
    deleteBook: async (req, res) => {
        new Promise((resolve, reject) => {
            const id = getId(req.params.id) || reject();
            const del = `DELETE FROM books WHERE id=${id}`;

            db.run(del, err => err ? reject() : resolve());
        })
            .then(() => res.status(200).send("Ok."))
            .catch(() => res.status(400).send("Bad Request."));
    }
};

module.exports = controllers;