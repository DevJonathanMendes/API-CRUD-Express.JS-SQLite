const express = require("express");
const { startDatabase } = require("./models/index");
const morganMiddleware = require("./middlewares/morgan");
const helmet = require("helmet");
const router = require("./routes/index");

const app = express();

startDatabase();
app.use(morganMiddleware);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = app;
