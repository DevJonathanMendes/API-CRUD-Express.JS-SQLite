const ServiceDatabase = require("../services/ServiceDatabase");

const formatCreateSQL = obj => {
    const format = (acc, value, index, array) =>
        array.length - 1 == index
            ? acc += `'${value}'`
            : acc += `'${value}',`;

    const getKeysObj = obj => Object.keys(obj).toString();
    const getValuesObj = obj => Object.values(obj).reduce(format, "");

    const columns = getKeysObj(obj);
    const values = getValuesObj(obj);

    return { columns, values };
};

const formatTableSQL = rows => {
    const concat = (str1, str2) => str1 + str2.join(" ");
    const format = (acc, values, index, array) =>
        array.length - 1 == index
            ? concat(acc, values)
            : `${concat(acc, values)},`;

    return Object.entries(rows).reduce(format, "");
};

const formatUpdateSQL = obj => {
    const normalize = value =>
        typeof value == "string" ? value.toLowerCase() : value;

    const entries = Object.entries(obj);

    const transformedEntries = entries
        .map(([key, value]) => `${key}='${normalize(value)}'`);

    const transformedObj = transformedEntries.toString();

    return transformedObj;
};

class ModelDatabase {
    constructor(tableName, rows) {
        this.tableName = tableName;
        this.db = new ServiceDatabase(tableName, formatTableSQL(rows));
    };

    create(obj) {
        return this.db.create(formatCreateSQL(obj));
    };

    read(id) {
        return this.db.read(id);
    };

    update(id, obj) {
        return this.db.read(id)
            .then(found => found
                ? this.db.update(id, formatUpdateSQL(obj))
                : "Not Found"
            )
            .catch(err => { throw err });
    };

    delete(id) {
        return this.db.delete(id);
    };
};

module.exports = ModelDatabase;
