const usersRoutes = require('./users');
const signupRoutes = require('./signup');
const privateRoutes = require('./private');

const constructorMethod = (app) => {
    app.use('/private', privateRoutes);   
    app.use('/signup', signupRoutes);
    app.use('/', usersRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;