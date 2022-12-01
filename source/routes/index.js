const express = require("express");
const booksRouter = require("./booksRouter");

const router = express.Router();

router.use("/books", booksRouter);
router.use((req, res, next) => {
    res.status(404).send("Not Found.");
});

module.exports = router;
