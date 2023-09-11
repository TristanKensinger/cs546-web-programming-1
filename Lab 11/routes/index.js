const path = require('path');

const constructorMethod = (app) => {
    app.get('/', function (req, res) {
        try {
            res.sendFile(path.resolve('static/home.html'));
        } catch (e) {
            res.sendStatus(500);
        }
    });

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;