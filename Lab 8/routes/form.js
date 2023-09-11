const express = require('express');
const router = express.Router();
const data = require('../data');
const tvData = data.tv;

router.post('/searchshows', async (req, res) => {
    try {
        let showSearchTerm = req.body.showSearchTerm;
        if(showSearchTerm === undefined){
            res.status(400).render('partials/errors', { type: 'error', error: 'Invalid POST request!', title: 'Error Page' });
            return;
        }
        if(showSearchTerm === ''){
            res.status(400).render('partials/errors', { type: 'error', error: 'Must enter a search term!', title: 'Error Page' });
            return;
        }
        showSearchTerm = showSearchTerm.trim();
        if(showSearchTerm.length === 0){
            res.status(400).render('partials/errors', { type: 'error', error: 'Must enter a valid search term!', title: 'Error Page' });
            return;
        }
        try{
            const shows = await tvData.getShows(showSearchTerm);
            res.render('partials/searchshows', { showSearchTerm: showSearchTerm, shows: shows, title: 'Shows Found' });
        } catch(e) {
            res.status(e.status).render('partials/errors', e.body );
        }
    } catch (e) {
        res.status(500).render('partials/errors', { type: 'error', error: e, title: 'Error Page' });
    }
});

router.get('/', async (req, res) => {
    res.render('partials/form', { title: 'Show Finder' });
});

module.exports = router;