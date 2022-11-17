const express = require("express");
const controllers = require("../controllers/index");

const router = express.Router();

/* // CORS.
router.use((req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
        "Access-Control-Allow-Headers": " Content-Type, Origin, X-Requested-With, Accept",
        "Access-Control-Allow-Credentials": "true"
    })
    next();
}); */

router.route("/books")
    .get(controllers.getAllBooks)
    .post(controllers.createBook);

router.route("/books/:id")
    .get(controllers.getBook)
    .patch(controllers.patchBook)
    .delete(controllers.deleteBook);

module.exports = router;
