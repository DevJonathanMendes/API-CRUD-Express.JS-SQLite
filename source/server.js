require("dotenv/config")
const express = require("express");
const app = require("./app");

const server = express();
const PORT = process.env.PORT || 3000;

server.use(app);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
