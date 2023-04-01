module.exports = formatSQL = {
    create: obj => {
        const columns = Object.keys(obj).toString();
        const values = Object.values(obj)
            .reduce((acc, value, index, array) =>
                array.length - 1 == index
                    ? acc + `'${value}'`
                    : acc + `'${value}',`
                , "");

        return { columns, values };
    },

    table: rows => {
        return Object.entries(rows)
            .reduce((acc, values, index, array) =>
                array.length - 1 == index
                    ? `${acc + values.join(" ")}`
                    : `${acc + values.join(" ")},`
                , "");
    },

    update: obj => {
        return Object.entries(obj)
            .map(([key, value]) => `${key}='${value}'`);
    }
};
