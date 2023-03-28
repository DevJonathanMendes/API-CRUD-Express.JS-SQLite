const ServiceDatabase = require("../services/ServiceDatabase");

const formatObj = obj => {
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

const formatColumns = rows => {
    const concat = (str1, str2) => str1 + str2.join(" ");
    const format = (acc, values, index, array) =>
        array.length - 1 == index
            ? concat(acc, values)
            : `${concat(acc, values)},`;

    return Object.entries(rows).reduce(format, "");
};

class ModelDatabase {
    constructor(tableName, rows) {
        this.tableName = tableName;
        this.db = new ServiceDatabase(tableName, formatColumns(rows));
    };

    create(obj) {
        const { columns, values } = formatObj(obj);
        return this.db.create(columns, values);
    };

    read(id) { return this.db.read(id); };

    delete(id) {
        return this.db.delete(id)
    };
};

module.exports = ModelDatabase;
