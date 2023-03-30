const express = require("express");
const controllersBooks = require("../controllers/controllersBooks");
const validateId = require("../middlewares/validateId");
const validateJSON = require("../middlewares/validateJSON");

const booksRouter = express.Router();

booksRouter.route("/")
    .get(controllersBooks.getAllBooks)
    .post(validateJSON, controllersBooks.createBook);
booksRouter.route("/:id")
    .get(validateId, controllersBooks.getBook)
    .patch([validateId, validateJSON], controllersBooks.patchBook)
    .delete(validateId, controllersBooks.deleteBook);

module.exports = booksRouter;
