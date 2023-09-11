const express = require('express');
const {ObjectId} = require('mongodb');
const router = express.Router();
const data = require('../data');
const albumData = data.albums;
const bandData = data.bands;

router.get('/:id', async (req, res) => {
  //valid id
  if(typeof req.params.id != 'string'){
    res.status(400).json({ error: 'Id must be a string!' });
    return;
  }
  req.params.id = req.params.id.trim();
  if(req.params.id.length === 0){
    res.status(400).json({ error: 'Id must not be an empty string!' });
    return;
  }
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({ error: 'Id is not a valid ObjectId!' });
    return;
  }

  //function
  let album;
  try {
    album = await albumData.getAll(req.params.id);
  } catch (e) {
    res.sendStatus(404);
    return;
  }
  try {
    res.json(album);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/:id', async (req, res) => {
  let albumInfo = req.body;

  //valid id
  if(typeof req.params.id != 'string'){
    res.status(400).json({ error: 'Id must be a string!' });
    return;
  }
  req.params.id = req.params.id.trim();
  if(req.params.id.length === 0){
    res.status(400).json({ error: 'Id must not be an empty string!' });
    return;
  }
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({ error: 'Id is not a valid ObjectId!' });
    return;
  }

  //valid title
  if(typeof albumInfo.title != 'string'){
    res.status(400).json({ error: 'Title must be a string!' });
    return;
  }
  albumInfo.title = albumInfo.title.trim();
  if(albumInfo.title.length === 0){
    res.status(400).json({ error: 'Title must not be an empty string!' });
    return;
  }

  //valid releaseDate
  if(typeof albumInfo.releaseDate != 'string'){
    res.status(400).json({ error: 'releaseDate must be a string!' });
    return;
  }
  albumInfo.releaseDate = albumInfo.releaseDate.trim();
  if(albumInfo.releaseDate.length < 10){
    res.status(400).json({ error: 'releaseDate is not a valid date!' });
    return;
  }
  albumInfo.releaseDateYear = Number(albumInfo.releaseDate.substring(albumInfo.releaseDate.length - 4));
  if(typeof albumInfo.releaseDateYear != 'number' || isNaN(albumInfo.releaseDateYear)){
    res.status(400).json({ error: 'releaseDate year must be a number!' });
    return;
  }
  albumInfo.releaseDateMonth = Number(albumInfo.releaseDate.substring(0, 2));
  if(typeof albumInfo.releaseDateMonth != 'number' || isNaN(albumInfo.releaseDateMonth)){
    res.status(400).json({ error: 'releaseDate month must be a number!' });
    return;
  }
  albumInfo.releaseDateDay = Number(albumInfo.releaseDate.substring(3, 5));
  if(typeof albumInfo.releaseDateDay != 'number' || isNaN(albumInfo.releaseDateDay)){
    res.status(400).json({ error: 'releaseDate day must be a number!' });
    return;
  }
  if(albumInfo.releaseDateYear < 1900 || albumInfo.releaseDateYear > 2022 + 1){
    res.status(400).json({ error: 'Invalid year!' });
    return;
  }

  //valid tracks
  if(!Array.isArray(albumInfo.tracks)){
    res.status(400).json({ error: 'tracks must be an array!' });
    return;
  }
  if(albumInfo.tracks.length < 3){
    res.status(400).json({ error: 'tracks must have atleast three elements!' });
    return;
  }
  for(let i=0; i<albumInfo.tracks.length; i++){
    if(typeof albumInfo.tracks[i] != 'string'){
      res.status(400).json({ error: 'All elements of tracks must be a string!' });
      return;
    }
    albumInfo.tracks[i] = albumInfo.tracks[i].trim();
    if(albumInfo.tracks[i].length === 0){
      res.status(400).json({ error: 'All elements of tracks must not be an empty string!' });
      return;
    }
  }

  //valid rating
  if(typeof albumInfo.rating != 'number'){
    res.status(400).json({ error: 'Rating must be a number!' });
    return;
  }
  albumInfo.rating = Number(albumInfo.rating.toFixed(1));
  if(albumInfo.rating < 1 || albumInfo.rating > 5){
    res.status(400).json({ error: 'Rating must be in range 1 to 5 inclusive' });
    return;
  }
  

  //function
  try {
    await bandData.get(req.params.id);
  } catch (e) {
    res.sendStatus(404);
    return;
  }
  try {
    await albumData.create(
      req.params.id,
      albumInfo.title,
      albumInfo.releaseDate,
      albumInfo.tracks,
      albumInfo.rating
    );
    let band = await bandData.get(req.params.id);
    res.json(band);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/album/:id', async (req, res) => {
  //valid id
  if(typeof req.params.id != 'string'){
    res.status(400).json({ error: 'Id must be a string!' });
    return;
  }
  req.params.id = req.params.id.trim();
  if(req.params.id.length === 0){
    res.status(400).json({ error: 'Id must not be an empty string!' });
    return;
  }
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({ error: 'Id is not a valid ObjectId!' });
    return;
  }

  //function
  let album;
  try {
    album = await albumData.get(req.params.id);
  } catch (e) {
    res.sendStatus(404);
    return;
  }
  try {
    res.json(album);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  //valid id
  if(typeof req.params.id != 'string'){
    res.status(400).json({ error: 'Id must be a string!' });
    return;
  }
  req.params.id = req.params.id.trim();
  if(req.params.id.length === 0){
    res.status(400).json({ error: 'Id must not be an empty string!' });
    return;
  }
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({ error: 'Id is not a valid ObjectId!' });
    return;
  }

  try {
    await albumData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Album not found' });
    return;
  }
  try {
    let album = await albumData.remove(req.params.id);
    res.json(album);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;