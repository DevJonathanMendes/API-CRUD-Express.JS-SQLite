const dataBase = require("../models/index");
const log = require("../utils/logger");
const cache = require("../utils/cache");
const validateJSON = require("../middlewares/validateJSON");


const controllers = {
    createBook: (req, res, next) => {
        const book = req.body;

        dataBase.run(book)
            .then(lastID => res.status(201).json({
                response: true,
                status: "Created",
                book: { id: lastID, ...book }
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

    getBook: (req, res, next) => {
        const id = req.params.id;
        const bookCache = cache.get(id);

        if (bookCache) return res.status(200).json({
            response: true,
            status: "Ok",
            book: bookCache
        });

        dataBase.get(id)
            .then(book => {
                cache.set(id, book);
                return res.status(200).json({
                    response: true,
                    status: "Ok",
                    book: book || {}
                });
            })
            .catch(err => next(err))
    },

    patchBook: (req, res, next) => {
        const id = req.params.id;
        const books = req.body;

        dataBase.patch(id, books).then(resolve => {
            cache.del(id);
            return res.status(200).json({
                response: true,
                status: "Ok",
                book: resolve
            });
        }).catch(err => next(err));
    },

    deleteBook: (req, res, next) => {
        const id = req.params.id;

        dataBase.delete(id)
            .then(msg => {
                cache.del(id);
                return res.status(200).json({
                    response: true,
                    status: "Ok",
                    message: msg
                });
            })
            .catch(err => next(err));
    }
};

module.exports = controllers;
