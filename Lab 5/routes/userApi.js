//Code Credit to Patrick Hill's Lecture Code
const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router
    .route('/people/:id')
    .get(async (req, res) => {
        try {
            const person = await userData.getPersonById(req.params.id);
            res.json(person);
        } catch (e) {
            res.status(404).json(e);
        }
    })

router
    .route('/work/:id')
    .get(async (req, res) => {
        try {
            const work = await userData.getWorkById(req.params.id);
            res.json(work);
        } catch (e) {
            res.status(404).json(e);
        }
    })

router
    .route('/people')
    .get(async (req, res) => {
        try {
            const peopleList = await userData.getAllPeople();
            res.json(peopleList);
        } catch (e) {
            res.status(500).send(e);
        }
    })

router
    .route('/work')
    .get(async (req, res) => {
        try {
            const workList = await userData.getAllWork();
            res.json(workList);
        } catch (e) {
            res.status(500).send(e);
        }
    })

module.exports = router;