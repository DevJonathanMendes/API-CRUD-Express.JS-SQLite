const express = require("express");
const { startDatabase } = require("./models/index");
const router = require("./routes/books");
const logger = require("./utils/logger");
const morganMiddleware = require("./middlewares/morgan");

const server = express();
const PORT = process.env.PORT || 3000;

startDatabase();
server.use(morganMiddleware);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(router);

server.listen(PORT, () => logger.debug(`Server listening on port ${PORT}`));
