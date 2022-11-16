const express = require("express");
const { startDatabase } = require("./models/index");
const morganMiddleware = require("./middlewares/morgan");
const router = require("./routes/books");

const app = express();

startDatabase();
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = app;
