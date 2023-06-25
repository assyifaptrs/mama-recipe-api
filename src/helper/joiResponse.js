/* eslint-disable */
const Joi = require('joi');

exports.register = Joi.object().keys({
  id: Joi.number().required(),

  name: Joi.string().required(),

  email: Joi.string().required(),

  phone: Joi.string().required().min(3).max(13),

  password: Joi.string().required().min(3).max(10),

  level: Joi.number().required(),
});
