const express = require("express");
const router = express.Router();

// Logger.
router.use((req, res, next) => {
    console.log(`Request ${req.method}: ${new Date().toLocaleString()}`);
    console.log(`User-Agent: ${req.headers["user-agent"]}`);
    next();
});

router.route("/books")
    .get((req, res) => {
        res.send("GET BOOKS");
    })
    .post((req, res) => {
        res.send("POST BOOKS");
    })
    .patch((req, res) => {
        res.send("PATCH BOOKS");
    })
    .delete((req, res) => {
        res.send("DELETE BOOKS");
    });

module.exports = router;