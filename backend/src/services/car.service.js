const { Car } = require('../models');

const createCarService = async carData => {
  const { files } = req;

  if (!files || files.length === 0) {
    return res
      .status(400)
      .send({ message: 'At least one image upload is required!' });
  }
  const imageUrls = files.map(file => `/uploads/${file.filename}`);

  const car = Car.create({ ...carData, pictures: imageUrls });
  return await car;
};

const getCarByIdService = async id => {
  return await Car.findById(id);
};

const getAllCarsService = async () => {
  return await Car.find();
};
const getCarsByUserService = async userId => {
  try {
    const cars = await Car.find({ userId: userId });
    return cars;
  } catch (error) {
    throw new Error('Error fetching cars by user: ' + error.message);
  }
};
const updateCarByIdService = async (id, updateData) => {
  const car = await Car.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
  return car;
};

const deleteCarByIdService = async id => {
  const car = await Car.findByIdAndDelete(id);
  return !!car;
};

module.exports = {
  createCarService,
  getCarByIdService,
  getAllCarsService,
  updateCarByIdService,
  deleteCarByIdService,
  getCarsByUserService
};
