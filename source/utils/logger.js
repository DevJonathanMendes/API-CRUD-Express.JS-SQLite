require("dotenv").config();
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf } = format;

const level = () => {
    const env = process.env.NODE_ENV || "development"
    return env === "development" ? "debug" : "warn"
};

const myFormat = combine(
    timestamp({ format: "DD-MM-YYYY HH:mm:ss:ms" }),
    format.json()
);

const messageFormat = info => `${info.timestamp} ${info.level}: ${info.message}`;
const myTransports = [
    new transports.Console({ format: printf(messageFormat) }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/warn.log", level: "warn" })
];

const logger = createLogger({
    level: level(),
    format: myFormat,
    transports: myTransports
});

module.exports = logger;
