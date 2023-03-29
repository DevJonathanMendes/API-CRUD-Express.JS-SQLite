const express = require("express");
const controllers = require("../controllers/index");
const transformBook = require("../middlewares/transformUpdateBook");
const validateId = require("../middlewares/validateId");
const validateJSON = require("../middlewares/validateJSON");

const booksRouter = express.Router();

booksRouter.route("/")
    .get(controllers.getAllBooks)
    .post(validateJSON, controllers.createBook);
booksRouter.route("/:id")
    .get(validateId, controllers.getBook)
    .patch([validateId, validateJSON], controllers.patchBook)
    .delete(validateId, controllers.deleteBook);

module.exports = booksRouter;
