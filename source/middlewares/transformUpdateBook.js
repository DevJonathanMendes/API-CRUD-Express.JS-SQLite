const normalize = value =>
    typeof value == "string" ? value.toLowerCase() : value;

const transformBook = (req, res, next) => {
    try {
        const entries = Object.entries(req.body);

        const transformedEntries = entries
            .map(([key, value]) => `${key}='${normalize(value)}'`);

        const transformedBook = transformedEntries.toString();

        req.body = { book: req.body, transformedBook };

        next();
    } catch (err) {
        next("Unable to transform the new book information.");
    };
};

module.exports = transformBook;
