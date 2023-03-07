const { ValidationError, UnexistedContactError } = require("./errors");

const asyncWraper = (controller) => {
    return (req, res, next) => {
        controller(req, res).catch(next);
    };
};

const errorHandler = (error, req, res, next) => {
    if (error instanceof ValidationError || error instanceof UnexistedContactError) {
        return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: error.message })
}

module.exports = {
    asyncWraper, errorHandler
}