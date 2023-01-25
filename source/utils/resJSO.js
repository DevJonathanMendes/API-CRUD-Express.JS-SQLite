const objectJSON = (boolean, status, it) => {
    return {
        response: boolean,
        status: status,
        ...it
    };
};

const resJSON = (status, it) => {
    switch (status) {
        case "Ok": return objectJSON(true, status, it);
        case "Created": return objectJSON(true, status, it);
        case "Not Found": return objectJSON(false, status, it);
        case "Bad Request": return objectJSON(false, status, it);
        case "Internal Server Error": return objectJSON(false, status, it);
    };
};

module.exports = resJSON;
