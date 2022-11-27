const express = require("express");
const booksRouter = require("./booksRouter");

const router = express.Router();

router.use("/books", booksRouter);

module.exports = router;
