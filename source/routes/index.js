const express = require("express");
const booksRouter = require("./booksRouter");
const logger = require("../utils/logger");
const resJSON = require("../utils/resJSON");

const router = express.Router();

router.use("/books", booksRouter);

router.use((req, res, next) => {
    return res.status(404).json(
        resJSON("Not Found", { message: "Route does not exist." })
    );
});

router.use((err, req, res, next) => {
    if (err instanceof Error)
        return res.status(400).json(
            resJSON("Bad Request", { message: err.message })
        );

    logger.error(err);

    return res.status(500).json(
        resJSON("Internal Server Error", { message: err })
    );
});

module.exports = router;
