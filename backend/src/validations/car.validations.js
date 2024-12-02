const Joi = require('joi');
const createCarValidation = Joi.object().keys({
  carModel: Joi.string()
    .required()
    .min(3)
    .trim()
    .error(new Error('Car model is required and must be a valid string')),
  price: Joi.number()
    .required()
    .min(0)
    .error(new Error('Price is required and must be a non-negative number')),
  phone: Joi.string()
    .required()
    .pattern(/^\d{10}$/)
    .error(new Error('Phone must be a valid 10-digit number')),
  city: Joi.string()
    .required()
    .trim()
    .error(new Error('City is required and must be a valid string')),
  pictures: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .required()
    .error(new Error('At least one valid picture URL is required')),
  userId: Joi.string()
    .required()
    .error(new Error('User ID is required and must be a valid string'))
});

const updateCarValidation = Joi.object().keys({
  carModel: Joi.string()
    .trim()
    .error(new Error('Car model must be a valid string')),
  price: Joi.number()
    .min(0)
    .error(new Error('Price must be a non-negative number')),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .error(new Error('Phone must be a valid 10-digit number')),
  city: Joi.string().trim().error(new Error('City must be a valid string')),
  pictures: Joi.array()
    .items(Joi.string().uri())
    .error(new Error('Pictures must contain valid URLs'))
});

const getCarByIdValidation = Joi.object().keys({
  id: Joi.string()
    .required()
    .error(new Error('Car ID is required and must be a valid string'))
});

const deleteCarValidation = Joi.object().keys({
  id: Joi.string()
    .required()
    .error(new Error('Car ID is required and must be a valid string'))
});

module.exports = {
  createCarValidation,
  updateCarValidation,
  getCarByIdValidation,
  deleteCarValidation
};
