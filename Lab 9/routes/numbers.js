const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.sendFile(path.resolve('static/main.html'));
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;