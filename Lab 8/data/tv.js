const axios = require('axios');

async function searchShows(showSearchTerm){
    const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${showSearchTerm}`);
    return data;
}

async function searchShow(id){
    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    return data;
}

let exportedMethods = {
    async getShows(showSearchTerm){
        // input checking
        if(showSearchTerm === ''){
            throw {status: 400, body: {type: 'error', error: 'Must enter a search term!', title: 'Error Page'}};
        }
        showSearchTerm = showSearchTerm.trim();
        if(showSearchTerm.length === 0){
            throw {status: 400, body: {type: 'error', error: 'Must enter a valid search term!', title: 'Error Page'}};
        }

        // function
        const shows = await searchShows(showSearchTerm);
        if(shows.length <= 5){
            return shows;
        }
        let output = [];
        for(let i=0; i<5; i++){
            output.push(shows[i]);
        }
        return output;
    },

    async getShowById(id){
        // input checking
        if(id === ''){
            throw {status: 400, body: {type: 'error', error: 'Must enter an ID!', title: 'Error Page'}};
        }
        id = id.trim();
        if(id.length === 0){
            throw {status: 400, body: {type: 'error', error: 'Must enter a valid ID!', title: 'Error Page'}};
        }

        // function
        try{
            const show = await searchShow(id);
            return show;
        } catch(e) {
            throw {status: 404, body: {type: 'error-not-found', error: 'No show with the supplied ID!', title: 'Error Page'}};
        }
    }
};

module.exports = exportedMethods;