const throwError = message => {
    throw new Error(message);
};

const getId = id => /^\d*$/.test(id) ? id : null;

const validateJSON = book => {
    const keys = Object.keys(book);

    keys.forEach(key => {
        switch (key) {
            case "id":
                throwError("You cannot set the ID.");
                break;
            case "title":
                if (!/^[\d\D]{2,64}$/.test(book[key])) {
                    throwError("Invalid Title.");
                }; break;
            case "author":
                if (!/^[\d\D]{2,64}$/.test(book[key])) {
                    throwError("Invalid Author.");
                }; break;
            case "pages":
                if (!/^\d{1,5}$/.test(book[key])) {
                    throwError("Invalid Pages.");
                }; break;
            case "published":
                if (!/^\d{4}$/.test(book[key])) {
                    throwError("Invalid Published.");
                }; break;
            default: throwError("Invalid JSON.");
        };
    });
};

module.exports = { validateJSON, getId };
