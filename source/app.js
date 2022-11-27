const express = require("express");
require("./models/index");
const morganMiddleware = require("./middlewares/morgan");
const helmet = require("helmet");
const router = require("./routes/index");

const app = express();

app.use(morganMiddleware);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = app;
