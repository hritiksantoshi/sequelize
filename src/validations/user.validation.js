const Joi = require('joi');
const { password } = require('./custom.validation');

function register(body){
  return Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(12).pattern(/[a-zA-Z]/),
    name: Joi.string().required()
  }).validate(body);
}

module.exports = {
    register
}