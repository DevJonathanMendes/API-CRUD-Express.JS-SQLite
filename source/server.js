const express = require("express");
const { startDatabase } = require("./models/index");
const router = require("./routes/books");

const server = express();
const PORT = process.env.PORT || 3000;

startDatabase();
server.use(express.json());
server.use(router);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
