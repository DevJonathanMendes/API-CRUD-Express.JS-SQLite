const express = require("express");
const controllers = require("../controllers/index");

const router = express.Router();

router.route("/books")
    .get(controllers.getAllBooks)
    .post(controllers.createBook);

router.route("/books/:id")
    .get(controllers.getBook)
    .patch(controllers.patchBook)
    .delete(controllers.deleteBook);

module.exports = router;
