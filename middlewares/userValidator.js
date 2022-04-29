const { celebrate, Joi } = require('celebrate');

const userSigninValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  }),
});

const userSignupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
    name: Joi.string().required().min(2).max(30),
  }),
});

const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(4),
  }),
});

module.exports = {
  userSignupValidator,
  userSigninValidator,
  userUpdateValidator,
};
