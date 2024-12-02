const v1_routes = app => {
  app.use('/v1/auth', require('./v1/authentication/auth.routes'));
  app.use('/v1/cars', require('./v1/cars/cars.routes'));
};

module.exports = { v1_routes };
