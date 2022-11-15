require("dotenv").config();
const { createLogger, transports, format, addColors } = require("winston");
const { combine, timestamp, colorize, printf } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || "development"
    return env === "development" ? "debug" : "warn"
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "cyan",
    debug: "white",
};
addColors(colors);

const myFormat = combine(
    timestamp({ format: "DD-MM-YYYY HH:mm:ss:ms" }),
    format.json()
);

const messageFormat = info => `${info.timestamp} ${info.level}: ${info.message}`;
const myTransports = [
    new transports.Console({
        format: combine(
            colorize({ all: true }),
            printf(messageFormat))
    }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/exceptions.log", level: "error", handleExceptions: true }),
    new transports.File({ filename: "logs/http.log", level: "http" })
];

const logger = createLogger({
    level: level(),
    levels,
    format: myFormat,
    transports: myTransports,
    handleExceptions: true,
});

module.exports = logger;
