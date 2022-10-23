const express = require("express");
const router = express.Router();

// PARA DESENVOLVIMENTO.
console.clear();
router.use((req, res, next) => {
    console.log('Time: ', new Date().toLocaleString());
    next();
});
//

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