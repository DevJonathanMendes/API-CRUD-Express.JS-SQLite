const express = require("express");
const logger = require("../utils/logger");
const booksRouter = require("./booksRouter");

const router = express.Router();

router.use("/books", booksRouter);

router.use((req, res, next) => {
    res.status(404)
        .json({
            response: false,
            status: "Not Found",
            message: "Route does not exist."
        });
});

router.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            response: false,
            status: "Bad Request",
            message: err.message
        });
    }

    logger.error(err);

    return res.status(500).json({
        response: false,
        status: "Internal Server Error",
        message: err
    });
});

module.exports = router;
