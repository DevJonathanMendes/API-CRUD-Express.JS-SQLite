const express = require("express");
const app = require("./app");
const logger = require("./utils/logger");

const server = express();
const PORT = process.env.PORT || 3000;

server.use(app);

server.listen(PORT, () => logger.debug(`Server listening on port ${PORT}`));
