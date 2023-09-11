const express = require('express');
const router = express.Router();
const data = require('../data');
const tvData = data.tv;

// show id with no image 37922

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        if(id === ''){
            res.status(400).render('partials/errors', { type: 'error', error: 'Must enter an ID!', title: 'Error Page' });
            return;
        }
        id = id.trim();
        if(id.length === 0){
            res.status(400).render('partials/errors', { type: 'error', error: 'Must enter a valid ID!', title: 'Error Page'  });
            return;
        }
        try{
            const show = await tvData.getShowById(id);
            res.render('partials/show', { show: show , title: show.name});
        } catch (e){
            res.status(e.status).render('partials/errors', e.body );
        } 
    } catch (e) {
        res.status(500).render('partials/errors', { type: 'error', error: e, title: 'Error Page' });
    }
});

router.get('/', async (req, res) => {
    res.status(400).render('partials/errors', { type: 'error', error: 'Must provide an ID!', title: 'Error Page' });
});

module.exports = router;