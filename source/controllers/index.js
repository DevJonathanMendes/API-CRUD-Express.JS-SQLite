const dataBase = require("../models/index");
const cache = require("../utils/cache");
const resJSON = require("../utils/resJSON");

const controllers = {
    createBook: (req, res, next) => {
        const book = req.body;

        dataBase.run(book)
            .then(lastID => res.status(201)
                .json(resJSON("Created", { id: lastID, ...book })))
            .catch(err => next(err));
    },

    getAllBooks: (req, res, next) => {
        dataBase.all()
            .then(books => res.status(200).json(resJSON("Ok", { books })))
            .catch(err => next(err));
    },

    getBook: (req, res, next) => {
        const id = req.params.id;
        const book = cache.get(id);

        if (book) return res.status(200).json(resJSON("Ok", { book }));

        dataBase.get(id)
            .then(book => {
                cache.set(id, book);
                return res.status(200).json(resJSON("Ok", { book: book || "Does not exist." }));
            })
            .catch(err => next(err))
    },

    patchBook: (req, res, next) => {
        const id = req.params.id;
        const books = req.body;

        dataBase.patch(id, books).then(book => {
            cache.del(id);
            return res.status(200).json(resJSON("Ok", { book }));
        })
            .catch(err => next(err));
    },

    deleteBook: (req, res, next) => {
        const id = req.params.id;

        dataBase.delete(id)
            .then(message => {
                cache.del(id);
                return res.status(200).json(resJSON("Ok", { message }));
            })
            .catch(err => next(err));
    }
};

module.exports = controllers;
