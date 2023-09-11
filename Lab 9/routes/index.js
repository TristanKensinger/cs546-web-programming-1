//Code Credit to Patrick Hill's Lecture Code
const numbersRoutes = require('./numbers');

const constructorMethod = (app) => {
    app.use('/', numbersRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;