const express = require('express');
const router = express.Router();
const { ouchbuttondata } = require('../models');

router.get('/', async (req, res) => {
    const response = await ouchbuttondata.findAll();
    res.json(response);
});

router.get('/:clientId', async (req,res) => {
    const clientId = req.params.clientId;
    const data = await ouchbuttondata.findAll({ where: {ClientId: [clientId]}});
    res.json(data);
})

router.post('/', async (req, res) => {
    const newouchbuttondata = req.body;
    await ouchbuttondata.create(newouchbuttondata);
});

module.exports = router;