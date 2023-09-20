const express = require('express');
const router = express.Router();
const {therapist} = require('../models');

router.get('/', async (req, res) => {
    const listOfTherapist = await therapist.findAll();
    res.json(listOfTherapist);
});

router.post('/', async (req, res) => {
    const newlistOfTherapist = req.body;
    await therapist.create(newlistOfTherapist);
});

module.exports = router;