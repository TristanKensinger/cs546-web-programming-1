const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    return data;
}

async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

let exportedMethods = {
    async getPersonById(id){
        //input handling
        if(typeof Number(id) == 'number' && !isNaN(Number(id))){
            id = Number(id);
        } else {
            throw 'ID must be a number!';
        }
        //function
        const people = await getPeople();
        for(let i=0; i<people.length; i++){
            if(people[i].id === id){
                return people[i];
            }
        }
        throw 'Person was not found!';
    },

    async getWorkById(id){
        //input handling
        if(typeof Number(id) == 'number' && !isNaN(Number(id))){
            id = Number(id);
        } else {
            throw 'ID must be a number!';
        }
        //function
        const work = await getWork();
        for(let i=0; i<work.length; i++){
            if(work[i].id === id){
                return work[i];
            }
        }
        throw 'Work was not found!';
    },

    async getAllPeople(){
        return await getPeople();
    },

    async getAllWork(){
        return await getWork();
    }
};

module.exports = exportedMethods;