const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const bands = mongoCollections.bands;

module.exports = {
    async create(name, genre, website, recordLabel, bandMembers, yearFormed){
        //valid name
        if(typeof name != 'string'){
            throw 'Name must be a string!';
        }
        name = name.trim();
        if(name.length === 0){
            throw 'Name must not be an empty string!';
        }

        //valid genre
        if(!Array.isArray(genre)){
            throw 'Genre must be an array!';
        }
        if(genre.length < 1){
            throw 'Genre must have atleast one element!';
        }
        for(let i=0; i<genre.length; i++){
            if(typeof genre[i] != 'string'){
                throw 'All elements of genre must be a string!';
            }
            genre[i] = genre[i].trim();
            if(genre[i].length === 0){
                throw 'All elements of genre must not be an empty string!';
            }
        }

        //valid website
        if(typeof website != 'string'){
            throw 'Website must be a string!';
        }
        website = website.trim();
        if(website.length === 0){
            throw 'Website must not be an empty string!';
        }
        if(!website.toLowerCase().includes('http://www.')){
            throw "Website must include 'http://www.'!";
        }
        if(website.toLowerCase().indexOf('.com') === -1 || website.toLowerCase().indexOf('.com') != website.length - 4){
            throw "Website must end in '.com'!";
        }
        if(website.length < 20){
            throw 'Website needs more characters!';
        }

        //valid recordLabel
        if(typeof recordLabel != 'string'){
            throw 'Record label must be a string!';
        }
        recordLabel = recordLabel.trim();
        if(recordLabel.length === 0){
            throw 'Record label must not be an empty string!';
        }

        //valid bandMembers
        if(!Array.isArray(bandMembers)){
            throw 'Band members must be an array!';
        }
        if(bandMembers.length < 1){
            throw 'Band members must have atleast one element!';
        }
        for(let i=0; i<bandMembers.length; i++){
            if(typeof bandMembers[i] != 'string'){
                throw 'All elements of band members must be a string!';
            }
            bandMembers[i] = bandMembers[i].trim();
            if(bandMembers[i].length === 0){
                throw 'All elements of band members must not be an empty string!';
            }
        }

        //valid yearFormed
        if(typeof yearFormed != 'number'){
            throw 'Year formed must be a number!';
        }
        if(yearFormed < 1900 || yearFormed > 2022){
            throw 'Invalid year!';
        }

        //function
        let newBand = {
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            albums: [],
            overallRating: 0
        };
        const bandCollection = await bands();
        const insertInfo = await bandCollection.insertOne(newBand);
        if(insertInfo.insertedCount === 0){
            throw 'Could not add band!';
        }
        const newId = insertInfo.insertedId;
        const band = await this.get(newId.toString());
        return band;
    },

    async getAll(){
        const bandCollection = await bands();
        const bandList = await bandCollection.find(
            {},
            { projection: { _id: 1, name: 1 } }
        ).toArray();
        if (!bandList){
            throw 'Could not get all bands';
        }
        for(let i=0; i<bandList.length; i++){
            bandList[i]._id = bandList[i]._id.toString();
        }
        return bandList;
    },

    async get(id){
        //valid id
        if(typeof id != 'string'){
            throw 'Id must be a string!';
        }
        id = id.trim();
        if(id.length === 0){
            throw 'Id must not be an empty string!';
        }
        if(!ObjectId.isValid(id)){
            throw 'Id is not a valid ObjectId!';
        }

        //function
        const bandCollection = await bands();
        const band = await bandCollection.findOne({_id: ObjectId(id)});
        if(band === null){
            throw 'No band with that id!';
        }
        band._id = band._id.toString();
        for(let j=0; j<band.albums.length; j++){
            band.albums[j]._id = band.albums[j]._id.toString();
        }
        return band;
    },

    async remove(id){
        //valid id
        if(typeof id != 'string'){
            throw 'Id must be a string!';
        }
        id = id.trim();
        if(id.length === 0){
            throw 'Id must not be an empty string!';
        }
        if(!ObjectId.isValid(id)){
            throw 'Id is not a valid ObjectId!';
        }

        //function
        const bandCollection = await bands();
        const deletionInfo = await bandCollection.deleteOne({_id: ObjectId(id)});
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete band with id of ${id}`;
        }
        let output = {
            bandId: id,
            deleted: true
        }
        output.bandId = output.bandId.toString();
        return output;
    },

    async update(id, name, genre, website, recordLabel, bandMembers, yearFormed){
        //valid id
        if(typeof id != 'string'){
            throw 'Id must be a string!';
        }
        id = id.trim();
        if(id.length === 0){
            throw 'Id must not be an empty string!';
        }
        if(!ObjectId.isValid(id)){
            throw 'Id is not a valid ObjectId!';
        }

        //valid name
        if(typeof name != 'string'){
            throw 'Name must be a string!';
        }
        name = name.trim();
        if(name.length === 0){
            throw 'Name must not be an empty string!';
        }

        //valid genre
        if(!Array.isArray(genre)){
            throw 'Genre must be an array!';
        }
        if(genre.length < 1){
            throw 'Genre must have atleast one element!';
        }
        for(let i=0; i<genre.length; i++){
            if(typeof genre[i] != 'string'){
                throw 'All elements of genre must be a string!';
            }
            genre[i] = genre[i].trim();
            if(genre[i].length === 0){
                throw 'All elements of genre must not be an empty string!';
            }
        }

        //valid website
        if(typeof website != 'string'){
            throw 'Website must be a string!';
        }
        website = website.trim();
        if(website.length === 0){
            throw 'Website must not be an empty string!';
        }
        if(!website.toLowerCase().includes('http://www.')){
            throw "Website must include 'http://www.'!";
        }
        if(website.toLowerCase().indexOf('.com') === -1 || website.toLowerCase().indexOf('.com') != website.length - 4){
            throw "Website must end in '.com'!";
        }
        if(website.length < 20){
            throw 'Website needs more characters!';
        }

        //valid recordLabel
        if(typeof recordLabel != 'string'){
            throw 'Record label must be a string!';
        }
        recordLabel = recordLabel.trim();
        if(recordLabel.length === 0){
            throw 'Record label must not be an empty string!';
        }

        //valid bandMembers
        if(!Array.isArray(bandMembers)){
            throw 'Band members must be an array!';
        }
        if(bandMembers.length < 1){
            throw 'Band members must have atleast one element!';
        }
        for(let i=0; i<bandMembers.length; i++){
            if(typeof bandMembers[i] != 'string'){
                throw 'All elements of band members must be a string!';
            }
            bandMembers[i] = bandMembers[i].trim();
            if(bandMembers[i].length === 0){
                throw 'All elements of band members must not be an empty string!';
            }
        }

        //valid yearFormed
        if(typeof yearFormed != 'number'){
            throw 'Year formed must be a number!';
        }
        if(yearFormed < 1900 || yearFormed > 2022){
            throw 'Invalid year!';
        }

        //function
        const bandCollection = await bands();
        const band = await bandCollection.findOne({_id: ObjectId(id)});
        if(band === null){
            throw 'No band with supplied id to update!';
        }
        const albums = band.albums;
        const overallRating = band.overallRating;
        const updatedBand = {
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            albums: albums,
            overallRating: overallRating
        };
        const updatedInfo = await bandCollection.updateOne(
            {_id: ObjectId(id)},
            {$set: updatedBand}
        );
        if(updatedInfo.modifiedCount === 0){
            throw 'Could not update band successfully!';
        }
        return await this.get(id);
    }
};