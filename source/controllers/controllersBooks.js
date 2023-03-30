const ModelDatabase = require("../models/ModelDatabase");
const cache = require("../utils/cache");
const resJSON = require("../utils/resJSON");

const BooksDatabase = new ModelDatabase("books", {
    title: "TEXT NOT NULL UNIQUE",
    author: "TEXT NOT NULL",
    pages: "INTEGER NOT NULL",
    published: "INTEGER NOT NULL"
});

const controllers = {
    createBook: (req, res, next) => {
        const book = req.body;

        BooksDatabase.create(book)
            .then(lastID => res.status(201)
                .json(resJSON("Created", { book: { id: lastID, ...book } }))
            ).catch(err => next(err));
    },

    getAllBooks: (req, res, next) => {
        BooksDatabase.read()
            .then(books => res.status(200).json(resJSON("Ok", { books })))
            .catch(err => next(err));
    },

    getBook: (req, res, next) => {
        const id = req.params.id;
        const book = cache.get(id);

        if (book) return res.status(200).json(resJSON("Ok", { book }));

        BooksDatabase.read(id)
            .then(book => {
                cache.set(id, book);
                return res.status(200).json(resJSON("Ok", { book: book || "Does not exist." }));
            })
            .catch(err => next(err))
    },

    patchBook: (req, res, next) => {
        const id = req.params.id;
        const book = req.body;

        BooksDatabase.update(id, book)
            .then((message) => {
                cache.del(id);
                return res.status(200).json(resJSON("Ok", { message }));
            })
            .catch(err => next(err));
    },

    deleteBook: (req, res, next) => {
        const id = req.params.id;

        BooksDatabase.delete(id)
            .then(message => {
                cache.del(id);
                return res.status(200).json(resJSON("Ok", { message }));
            })
            .catch(err => next(err));
    }
};

module.exports = controllers;
