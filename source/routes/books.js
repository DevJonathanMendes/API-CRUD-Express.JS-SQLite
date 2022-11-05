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
    .get(controllers.getAllBooks)
    .post(controllers.createBook);

router.route("/books/:id")
    .delete((res, req) => { res.send("ROUTE DELETE") });

module.exports = router;