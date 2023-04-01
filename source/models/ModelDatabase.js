const ServiceDatabase = require("../services/ServiceDatabase");
const formatSQL = require("../utils/formatSQL");

class ModelDatabase {
    constructor(tableName, columns) {
        this.tableName = tableName;
        this.db = new ServiceDatabase(tableName, formatSQL.table(columns));
    };

    create(obj) {
        return this.db.create(formatSQL.create(obj));
    };

    read(id) {
        return this.db.read(id);
    };

    update(id, obj) {
        return this.db.read(id)
            .then(found => found
                ? this.db.update(id, formatSQL.update(obj))
                : "Not Found"
            )
            .catch(err => { throw err });
    };

    delete(id) {
        return this.db.delete(id);
    };
};

module.exports = ModelDatabase;
