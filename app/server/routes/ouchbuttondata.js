const express = require('express');
const router = express.Router();
const {ouchbuttondata} = require('../models');

router.get('/', async (req, res) => {
    const listOfouchbuttondata = await ouchbuttondata.findAll();
    res.json(listOfouchbuttondata);
});

router.post('/', async (req, res) => {
    const newouchbuttondata = req.body;
    await ouchbuttondata.create(newouchbuttondata);
});

module.exports = router;