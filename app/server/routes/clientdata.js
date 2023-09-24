const express = require('express');
const router = express.Router();
const { clientdata } = require('../models');

router.get('/', async (req, res) => {
    const response = await clientdata.findAll();
    res.json(response);
});

router.get('/:clientId', async (req, res) => {
    const clientId = req.params.clientId;
    const client = await clientdata.findByPk(clientId)
    res.json(client);
});

router.post('/', async (req, res) => {
    const newClientData = req.body;
    await clientdata.create(newClientData);
});

module.exports = router;