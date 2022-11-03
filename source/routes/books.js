const express = require("express");
const controllers = require("../controllers/index");

const router = express.Router();

// Logger.
router.use((req, res, next) => {
    console.log(`Request ${req.method}: ${new Date().toLocaleString()}`);
    console.log(`User-Agent: ${req.headers["user-agent"]}`);
    next();
});

router.route("/books")
    .get((req, res) => {
        controllers.getAllBooks(req, res);
    })
    .post((req, res) => {
        controllers.createBook(req, res);
    })
    .patch((req, res) => {
        res.send("PATCH BOOKS");
    })
    .delete((req, res) => {
        res.send("DELETE BOOKS");
    });

module.exports = router;