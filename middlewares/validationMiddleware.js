const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const requestValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    email: Joi.string().min(3).max(30).required(),

    phone: Joi.string().min(3).max(30).required(),

    favorite: Joi.boolean(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error));
  }
  next();
};

const authValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().alphanum().min(6).max(30).required(),

    email: Joi.string().min(6).max(30).required(),

    subscription: Joi.string(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    next(new ValidationError(validationResult.error));
  }
  next();
};

const emailResendValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(30).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error));
  }
  next();
};

module.exports = {
  requestValidation,
  authValidation,
  emailResendValidation,
};
