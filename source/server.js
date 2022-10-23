const express = require("express");
const server = express();

const PORT = process.env.PORT || 3000;

server.use("/", express.json());

server.listen(PORT, () => console.log("Server On."));