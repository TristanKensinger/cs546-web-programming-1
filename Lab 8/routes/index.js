const formRoutes = require('./form');
const showRoutes = require('./show');

const constructorMethod = (app) => {
  app.use('/show', showRoutes);
  app.use('/', formRoutes);

  app.use('*', (req, res) => {
    res.status(404).render('partials/errors', { type: 'error-not-found', error: 'Not found', title: 'Error Page' });
  });
};

module.exports = constructorMethod;