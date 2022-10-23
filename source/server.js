const express = require("express");
const router = require("./routes/books");
const server = express();

const PORT = process.env.PORT || 3000;

server.use("/", [router, express.json()]);

server.listen(PORT, () => console.log("Server On."));