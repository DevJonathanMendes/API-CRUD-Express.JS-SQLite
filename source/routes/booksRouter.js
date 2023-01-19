const express = require("express");
const controllers = require("../controllers/index");
const validateJSON = require("../middlewares/validateJSON");

const booksRouter = express.Router();

booksRouter.route("/")
    .get(controllers.getAllBooks)
    .post(validateJSON, controllers.createBook);

booksRouter.route("/:id")
    .get(controllers.getBook)
    .patch(controllers.patchBook)
    .delete(controllers.deleteBook);

module.exports = booksRouter;
