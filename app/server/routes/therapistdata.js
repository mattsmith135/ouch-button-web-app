const express = require('express');
const router = express.Router();
const {therapistdata} = require('../models');

router.get('/', async (req, res) => {
    const response = await therapistdata.findAll();
    res.json(response);
});

router.post('/', async (req, res) => {
    const newTherapistData = req.body;
    await therapistdata.create(newTherapistData);
});

module.exports = router;