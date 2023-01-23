const validateId = (req, res, next) =>
    /^\d*$/.test(req.params.id)
        ? next()
        : next(new Error("The 'id' provided is invalid"));

module.exports = validateId;
