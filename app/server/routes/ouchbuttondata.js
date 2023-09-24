const express = require('express');
const { Op } = require('sequelize'); // importing Sequelize operators
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

router.get('/:clientId/:dayId', async (req,res) => {
    const clientId = req.params.clientId;
    const dayId = req.params.dayId;

    // The dayId is only a date while the Time is a date time string. 
    // Therefore, the method below is using a range of dates to query the database. 
    // By setting both the start and end date as the dayId, all the rows with a Time column where the date time range falls within the 24 hours of that dayId will be returned

    const start = new Date(dayId);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(dayId);
    end.setHours(23, 59, 59, 999);
    
    const data = await ouchbuttondata.findAll({ where: {ClientId: clientId, Time: {
        [Op.gte]: start, // gte = greater than or equal to
        [Op.lte]: end, // lte = less than or equal to 
    }}});
    
    res.json(data);
})

router.post('/', async (req, res) => { 
    const newouchbuttondata = req.body;
    await ouchbuttondata.create(newouchbuttondata);
});

module.exports = router;