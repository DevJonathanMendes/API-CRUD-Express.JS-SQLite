const express = require("express");
const controllers = require("../controllers/index");

const booksRouter = express.Router();

booksRouter.route("/")
    .get(controllers.getAllBooks)
    .post(controllers.createBook);

booksRouter.route("/:id")
    .get(controllers.getBook)
    .patch(controllers.patchBook)
    .delete(controllers.deleteBook);

module.exports = booksRouter;
