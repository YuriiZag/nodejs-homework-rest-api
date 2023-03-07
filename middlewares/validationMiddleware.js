const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  requestValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),

      email: Joi.string().min(3).max(30).required(),

      phone: Joi.string().min(3).max(30).required(),

      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error))
    }
    next();
  },
};
