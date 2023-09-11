const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const bands = require('./bands');
const bandsCollection = mongoCollections.bands;

module.exports = {
    async create(bandId, title, releaseDate, tracks, rating){
        //valid bandId
        if(typeof bandId != 'string'){
            throw 'bandId must be a string!';
        }
        bandId = bandId.trim();
        if(bandId.length === 0){
            throw 'bandId must not be an empty string!';
        }
        if(!ObjectId.isValid(bandId)){
            throw 'bandId is not a valid ObjectId!';
        }
        let band = await bands.get(bandId);

        //valid title
        if(typeof title != 'string'){
            throw 'Title must be a string!';
        }
        title = title.trim();
        if(title.length === 0){
            throw 'Title must not be an empty string!';
        }

        //valid releaseDate
        if(typeof releaseDate != 'string'){
            throw 'releaseDate must be a string!';
        }
        releaseDate = releaseDate.trim();
        if(releaseDate.length < 10){
            throw 'releaseDate is not a valid date!';
        }
        releaseDateYear = Number(releaseDate.substring(releaseDate.length - 4));
        if(typeof releaseDateYear != 'number' || isNaN(releaseDateYear)){
            throw 'releaseDate year must be a number!';
        }
        releaseDateMonth = Number(releaseDate.substring(0, 2));
        if(typeof releaseDateMonth != 'number' || isNaN(releaseDateMonth)){
            throw 'releaseDate month must be a number!';
        }
        releaseDateDay = Number(releaseDate.substring(3, 5));
        if(typeof releaseDateDay != 'number' || isNaN(releaseDateDay)){
            throw 'releaseDate day must be a number!';
        }
        if(releaseDateYear < 1900 || releaseDateYear > 2022 + 1){
            throw 'Invalid year!';
        }

        //valid tracks
        if(!Array.isArray(tracks)){
            throw 'tracks must be an array!';
        }
        if(tracks.length < 3){
            throw 'tracks must have atleast three elements!';
        }
        for(let i=0; i<tracks.length; i++){
            if(typeof tracks[i] != 'string'){
                throw 'All elements of tracks must be a string!';
            }
            tracks[i] = tracks[i].trim();
            if(tracks[i].length === 0){
                throw 'All elements of tracks must not be an empty string!';
            }
        }

        //valid rating
        if(typeof rating != 'number'){
            throw 'Rating must be a number!';
        }
        rating = Number(rating.toFixed(1));
        if(rating < 1 || rating > 5){
            throw 'Rating must be in range 1 to 5 inclusive';
        }

        //function
        const newAblum = {
            _id: ObjectId(),
            title: title,
            releaseDate: releaseDate,
            tracks: tracks,
            rating: rating
        };
        const bandCollection = await bandsCollection();
        let updatedInfo = await bandCollection.updateOne(
            {_id: ObjectId(bandId)},
            {$push: {albums: newAblum}}
        );
        if(updatedInfo.modifiedCount === 0){
            throw "Could not update band's albums successfully!";
        }

        //update overall rating
        band = await bands.get(bandId);
        let newOverallRating = 0;
        for(let i=0; i<band.albums.length; i++){
            newOverallRating += band.albums[i].rating;
        }
        newOverallRating /= band.albums.length;
        newOverallRating = Number(newOverallRating.toFixed(1));
        updatedInfo = await bandCollection.updateOne(
            {_id: ObjectId(bandId)},
            {$set: {overallRating: newOverallRating}}
        );
        if(updatedInfo.modifiedCount === 0 && updatedInfo.matchedCount === 0){
            throw "Could not update band's overallRating successfully!";
        }

        newAblum._id = newAblum._id.toString();
        return newAblum;
    },

    async getAll(bandId){
        //valid bandId
        if(typeof bandId != 'string'){
            throw 'bandId must be a string!';
        }
        bandId = bandId.trim();
        if(bandId.length === 0){
            throw 'bandId must not be an empty string!';
        }
        if(!ObjectId.isValid(bandId)){
            throw 'bandId is not a valid ObjectId!';
        }
        const band = await bands.get(bandId);

        //function
        let albums = [];
        for(let i=0; i<band.albums.length; i++){
            albums.push(band.albums[i]);
            albums[i]._id = albums[i]._id.toString();
        }
        return albums;
    },

    async get(albumId){
        //valid albumId
        if(typeof albumId != 'string'){
            throw 'albumId must be a string!';
        }
        albumId = albumId.trim();
        if(albumId.length === 0){
            throw 'albumId must not be an empty string!';
        }
        if(!ObjectId.isValid(albumId)){
            throw 'albumId is not a valid ObjectId!';
        }

        //function
        const bandCollection = await bandsCollection();
        let band = await bandCollection.findOne({'albums._id': ObjectId(albumId)});
        if(band == null){
            throw 'No album exists with that albumId!';
        }
        for(let i=0; i<band.albums.length; i++){
            if(band.albums[i]._id.toString() === albumId){
                band.albums[i]._id = band.albums[i]._id.toString();
                return band.albums[i];
            }
        }
    },

    async remove(albumId){
        //valid album
        await this.get(albumId);       
        
        //function
        const bandCollection = await bandsCollection();
        let bandOld = await bandCollection.findOne({'albums._id': ObjectId(albumId)});
        let updatedInfo = await bandCollection.updateOne({'albums._id': ObjectId(albumId)}, {$pull: {albums: {_id: ObjectId(albumId)}}});
        if(updatedInfo.modifiedCount === 0){
            throw 'Could not remove album successfully!';
        }

        //update overall rating
        let bandNew = await bands.get(bandOld._id.toString());
        let newOverallRating = 0;
        if(bandNew.albums.length > 0){
            for(let i=0; i<bandNew.albums.length; i++){
                newOverallRating += bandNew.albums[i].rating;
            }
            newOverallRating /= bandNew.albums.length;
            newOverallRating = Number(newOverallRating.toFixed(1));
        }
        updatedInfo = await bandCollection.updateOne(
            {_id: bandOld._id},
            {$set: {overallRating: newOverallRating}}
        );
        if(updatedInfo.modifiedCount === 0 && updatedInfo.matchedCount === 0){
            throw "Could not update band's overallRating successfully!";
        }

        let output = {
            albumId: albumId,
            deleted: true
        };
        output.albumId = output.albumId.toString();
        return output;
    }
};