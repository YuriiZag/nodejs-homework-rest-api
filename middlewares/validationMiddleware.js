const Joi = require("joi");


module.exports = {
    requestValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),

      email: Joi.string().min(3).max(30).required(),

      phone: Joi.string().min(3).max(30).required(),
    });

  const validationResult = schema.validate(req.body);
    if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details[0].message });
    }
    next()
    }
   
}