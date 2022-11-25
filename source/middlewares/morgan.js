require("dotenv").config();
const morgan = require("morgan");

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

const morganMiddleware = morgan("dev", { skip });

module.exports = morganMiddleware;
