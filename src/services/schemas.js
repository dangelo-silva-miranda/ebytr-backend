/*
  Material consultado sobre Joi
  https://www.digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation
  https://joi.dev/api/?v=17.4.2#general-usage
*/
const Joi = require('joi');

const id = Joi.number().integer().positive();
const text = Joi.string();

const taskDataSchema = Joi.object().keys({
  id,
  note: text.required(),
  status: text.required(),
});

module.exports = {
  taskDataSchema,
};
