const {
  createCarService,
  getCarByIdService,
  getAllCarsService,
  updateCarByIdService,
  deleteCarByIdService,
  getCarsByUserService
} = require('../services/car.service');
const catchAsync = require('../utils/catchAsync');

const createSingleCar = catchAsync(async (req, res) => {
  const car = await createCarService({ ...req.body, userId: req.user.id }); // Assume req.user is set by the authentication middleware
  res.status(201).send({ car });
});

const getCarById = catchAsync(async (req, res) => {
  const car = await getCarByIdService(req.params.id);
  if (!car) {
    return res.status(404).send({ message: 'Car not found' });
  }
  res.status(200).send({ car });
});
const getCarByUserId = catchAsync(async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const car = await getCarsByUserService(userId);
  if (!car) {
    return res.status(404).send({ message: 'Car not found' });
  }
  res.status(200).send({ car });
});

const getAllCars = catchAsync(async (req, res) => {
  const cars = await getAllCarsService();
  res.status(200).send({ cars });
});

const updateCar = catchAsync(async (req, res) => {
  const car = await updateCarByIdService(req.params.id, req.body);
  if (!car) {
    return res.status(404).send({ message: 'Car not found or update failed' });
  }
  res.status(200).send({ car });
});

const deleteCar = catchAsync(async (req, res) => {
  const result = await deleteCarByIdService(req.params.id);
  if (!result) {
    return res
      .status(404)
      .send({ message: 'Car not found or deletion failed' });
  }
  res.status(200).send({ message: 'Car deleted successfully' });
});

module.exports = {
  createSingleCar,
  getCarById,
  getAllCars,
  updateCar,
  deleteCar,
  getCarByUserId
};
