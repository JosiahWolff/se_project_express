const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("sring.uri");
};

module.exports.validateNewItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "imageUrl" must be filled in',
      "string.uri": 'The "imageUrl" must be a valid URL',
    }),

    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

module.exports.validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "imageUrl" must be filled in',
      "string.uri": 'The "imageUrl" must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" fileld bust be filled in',
    }),
  }),
});

module.exports.validateLogIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string-empty": "Email is required",
      "string.email": 'The "email" must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" fileld bust be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).messages({
      "string.hex": "The ID must be a hexadecimal string",
      "string.length": "The ID must be exactly 24 character long",
    }),
    itemId: Joi.string().hex().length(24).messages({
      "string.hex": "The ID must be a hexadecimal string",
      "string.length": "The ID must be exactly 24 character long",
    }),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "avatar URL" must be filled in',
      "string.uri": 'The "avatar URL" must be a valid URL',
    }),
  }),
});
