require("dotenv/config");
const sqlite3 = require("sqlite3");
const { Database } = sqlite3;
const { existsSync, mkdirSync } = require("fs");
const { error, debug } = require("../utils/logger");

const pathDatabase = "source/database";
existsSync(pathDatabase) || mkdirSync(pathDatabase);

const ifErr = (err, message) =>
    err ? error(err.message) : debug(message)

const createNewDB = tableName => {
    return process.env.NODE_ENV === "production"
        ? new Database(`${pathDatabase}/${tableName}.db`, err =>
            ifErr(err, "Database for production was created."))
        : new Database(`${pathDatabase}/${tableName}-temp.db`, err =>
            ifErr(err, "Database for development was created."));
};

class ServiceDatabase {
    constructor(tableName, rows) {
        const CREATE =
            `CREATE TABLE IF NOT EXISTS ${tableName}
            (id INTEGER PRIMARY KEY, ${rows});`;

        this.tableName = tableName;
        this.db = createNewDB(tableName);
        this.db.run(CREATE);
    };

    create(columns, values) {
        const INSERT = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values})`;

        return new Promise((resolve, reject) => {
            function response(err) {
                return err ? reject(err) : resolve(this.lastID);
            };

            this.db.run(INSERT, response);
        });
    };

    read(id) {
        const SELECTALL = `SELECT * FROM ${this.tableName}`;
        const WHEREID = `WHERE id=${id}`;

        return new Promise((resolve, reject) => {
            const response = (err, rows) =>
                err ? reject(err) : resolve(rows);

            id ? this.db.get(`${SELECTALL} ${WHEREID}`, response)
                : this.db.all(SELECTALL, response);
        });
    };

    update(id, values) {
        const UPDATE = `UPDATE ${this.tableName} SET ${values} WHERE id=${id}`;

        return new Promise((resolve, reject) => {
            const response = (err, rows) =>
                err ? reject(err) : resolve(rows);

            return this.db.run(UPDATE, response);
        });
    };

    delete(id) {
        const DELETE = `DELETE FROM ${this.tableName} WHERE id=${id}`;

        return new Promise((resolve, reject) =>
            this.db.run(DELETE, err =>
                err ? reject("Unable to delete") : resolve("Deleted")
            )
        );
    };
};

module.exports = ServiceDatabase;
