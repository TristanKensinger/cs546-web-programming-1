const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const {ObjectId} = require('mongodb');

// router.get('/:id', async (req, res) => {
//   try {
//     let user = await userData.getUserById(req.params.id);
//     res.json(user);
//   } catch (e) {
//     res.status(404).json({ error: 'User not found' });
//   }
// });

router.get('/', async (req, res) => {
  try {
    let bandList = await bandData.getAll();
    res.json(bandList);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  let bandInfo = req.body;

  //valid name
  if(typeof bandInfo.name != 'string'){
    res.status(400).json({ error: 'Name must be a string' });
    return;
  }
  bandInfo.name = bandInfo.name.trim();
  if(bandInfo.name.length === 0){
    res.status(400).json({ error: 'Name must not be an empty string!' });
    return;
  }

  //valid genre
  if(!Array.isArray(bandInfo.genre)){
    res.status(400).json({ error: 'Genre must be an array!' });
    return;
  }
  if(bandInfo.genre.length < 1){
    res.status(400).json({ error: 'Genre must have atleast one element!' });
    return;
  }
  for(let i=0; i<bandInfo.genre.length; i++){
    if(typeof bandInfo.genre[i] != 'string'){
      res.status(400).json({ error: 'All elements of genre must be a string!' });
      return;
    }
    bandInfo.genre[i] = bandInfo.genre[i].trim();
    if(bandInfo.genre[i].length === 0){
      res.status(400).json({ error: 'All elements of genre must not be an empty string!' });
      return;
    }
  }

  //valid website
  if(typeof bandInfo.website != 'string'){
    res.status(400).json({ error: 'Website must be a string!' });
    return;
  }
  bandInfo.website = bandInfo.website.trim();
  if(bandInfo.website.length === 0){
    res.status(400).json({ error: 'Website must not be an empty string!' });
    return;
  }
  if(!bandInfo.website.toLowerCase().includes('http://www.')){
    res.status(400).json({ error: "Website must include 'http://www.'!" });
    return;
  }
  if(bandInfo.website.toLowerCase().indexOf('.com') === -1 || bandInfo.website.toLowerCase().indexOf('.com') != bandInfo.website.length - 4){
    res.status(400).json({ error: "Website must end in '.com'!" });
    return;
  }
  if(bandInfo.website.length < 20){
    res.status(400).json({ error: 'Website needs more characters!' });
    return;
  }

  //valid recordLabel
  if(typeof bandInfo.recordLabel != 'string'){
    res.status(400).json({ error: 'Record label must be a string!' });
    return;
  }
  bandInfo.recordLabel = bandInfo.recordLabel.trim();
  if(bandInfo.recordLabel.length === 0){
    res.status(400).json({ error: 'Record label must not be an empty string!' });
    return;
  }

  //valid bandMembers
  if(!Array.isArray(bandInfo.bandMembers)){
    res.status(400).json({ error: 'Band members must be an array!' });
    return;
  }
  if(bandInfo.bandMembers.length < 1){
    res.status(400).json({ error: 'Band members must have atleast one element!' });
    return;
  }
  for(let i=0; i<bandInfo.bandMembers.length; i++){
    if(typeof bandInfo.bandMembers[i] != 'string'){
      res.status(400).json({ error: 'All elements of band members must be a string!' });
      return; 
    }
    bandInfo.bandMembers[i] = bandInfo.bandMembers[i].trim();
    if(bandInfo.bandMembers[i].length === 0){
      res.status(400).json({ error: 'All elements of band members must not be an empty string!' });
      return;
    }
  }

  //valid yearFormed
  if(typeof bandInfo.yearFormed != 'number'){
    res.status(400).json({ error: 'Year formed must be a number!' });
    return;
  }
  if(bandInfo.yearFormed < 1900 || bandInfo.yearFormed > 2022){
    res.status(400).json({ error: 'Invalid year!' });
    return;
  }

  //function
  try {
    const newBand = await bandData.create(
      bandInfo.name,
      bandInfo.genre,
      bandInfo.website,
      bandInfo.recordLabel,
      bandInfo.bandMembers,
      bandInfo.yearFormed
    );
    newBand.albums = [];
    newBand.overallRating = 0;
    res.json(newBand);
  } catch (e) {
    res.sendStatus(500);
  }
});

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
  let band;
  try {
    band = await bandData.get(req.params.id);
  } catch (e) {
    res.sendStatus(404);
    return;
  }
  try {
    band._id = band._id.toString();
    res.json(band);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  let bandInfo = req.body;

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

  //valid name
  if(typeof bandInfo.name != 'string'){
    res.status(400).json({ error: 'Name must be a string' });
    return;
  }
  bandInfo.name = bandInfo.name.trim();
  if(bandInfo.name.length === 0){
    res.status(400).json({ error: 'Name must not be an empty string!' });
    return;
  }

  //valid genre
  if(!Array.isArray(bandInfo.genre)){
    res.status(400).json({ error: 'Genre must be an array!' });
    return;
  }
  if(bandInfo.genre.length < 1){
    res.status(400).json({ error: 'Genre must have atleast one element!' });
    return;
  }
  for(let i=0; i<bandInfo.genre.length; i++){
    if(typeof bandInfo.genre[i] != 'string'){
      res.status(400).json({ error: 'All elements of genre must be a string!' });
      return;
    }
    bandInfo.genre[i] = bandInfo.genre[i].trim();
    if(bandInfo.genre[i].length === 0){
      res.status(400).json({ error: 'All elements of genre must not be an empty string!' });
      return;
    }
  }

  //valid website
  if(typeof bandInfo.website != 'string'){
    res.status(400).json({ error: 'Website must be a string!' });
    return;
  }
  bandInfo.website = bandInfo.website.trim();
  if(bandInfo.website.length === 0){
    res.status(400).json({ error: 'Website must not be an empty string!' });
    return;
  }
  if(!bandInfo.website.toLowerCase().includes('http://www.')){
    res.status(400).json({ error: "Website must include 'http://www.'!" });
    return;
  }
  if(bandInfo.website.toLowerCase().indexOf('.com') === -1 || bandInfo.website.toLowerCase().indexOf('.com') != bandInfo.website.length - 4){
    res.status(400).json({ error: "Website must end in '.com'!" });
    return;
  }
  if(bandInfo.website.length < 20){
    res.status(400).json({ error: 'Website needs more characters!' });
    return;
  }

  //valid recordLabel
  if(typeof bandInfo.recordLabel != 'string'){
    res.status(400).json({ error: 'Record label must be a string!' });
    return;
  }
  bandInfo.recordLabel = bandInfo.recordLabel.trim();
  if(bandInfo.recordLabel.length === 0){
    res.status(400).json({ error: 'Record label must not be an empty string!' });
    return;
  }

  //valid bandMembers
  if(!Array.isArray(bandInfo.bandMembers)){
    res.status(400).json({ error: 'Band members must be an array!' });
    return;
  }
  if(bandInfo.bandMembers.length < 1){
    res.status(400).json({ error: 'Band members must have atleast one element!' });
    return;
  }
  for(let i=0; i<bandInfo.bandMembers.length; i++){
    if(typeof bandInfo.bandMembers[i] != 'string'){
      res.status(400).json({ error: 'All elements of band members must be a string!' });
      return; 
    }
    bandInfo.bandMembers[i] = bandInfo.bandMembers[i].trim();
    if(bandInfo.bandMembers[i].length === 0){
      res.status(400).json({ error: 'All elements of band members must not be an empty string!' });
      return;
    }
  }

  //valid yearFormed
  if(typeof bandInfo.yearFormed != 'number'){
    res.status(400).json({ error: 'Year formed must be a number!' });
    return;
  }
  if(bandInfo.yearFormed < 1900 || bandInfo.yearFormed > 2022){
    res.status(400).json({ error: 'Invalid year!' });
    return;
  }

  //function
  try {
    await bandData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Band not found' });
    return;
  }
  try {
    const updatedBand = await bandData.update(req.params.id, bandInfo.name, bandInfo.genre, bandInfo.website, bandInfo.recordLabel, bandInfo.bandMembers, bandInfo.yearFormed);
    res.json(updatedBand);
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
    await bandData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Band not found' });
    return;
  }
  try {
    let band = await bandData.remove(req.params.id);
    res.json(band);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;