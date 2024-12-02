const express = require('express');
const router = express.Router();
const { register_route } = require('../../../utils/register.routes');
const validate = require('../../../middleware/validate');
const carController = require('../../../contorllers/car.controllers');
const {
  createCarValidation,
  updateCarValidation
} = require('../../../validations/car.validations');
const authenticate = require('../../../middleware/authentication');

const routes = [
  {
    route: '/create',
    middlewares: [
      authenticate,
      validate(createCarValidation),
      upload.array('images', 10)
    ],
    methods: [
      {
        method: 'POST',
        handler: carController.createSingleCar
      }
    ]
  },
  {
    route: '/get-user-specific-cars',
    middlewares: [authenticate],
    methods: [
      {
        method: 'GET',
        handler: carController.getCarByUserId
      }
    ]
  },
  {
    route: '/:id',
    methods: [
      {
        method: 'GET',
        handler: carController.getCarById
      }
    ]
  },
  {
    route: '/',
    methods: [
      {
        method: 'GET',
        handler: carController.getAllCars
      }
    ]
  },

  {
    route: '/update/:id',
    middlewares: [validate(updateCarValidation)],
    methods: [
      {
        method: 'PUT',
        handler: carController.updateCar
      }
    ]
  },
  {
    route: '/delete/:id',
    methods: [
      {
        method: 'DELETE',
        handler: carController.deleteCar
      }
    ]
  }
];

register_route(router, routes);
module.exports = router;
