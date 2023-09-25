const express = require('express');
const { Op } = require('sequelize'); // importing Sequelize operators
const router = express.Router();
const { ouchbuttondata } = require('../models');
const multer = require('multer');

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

// Define a storage engine for Multer to store uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Parameters: id of the client, data text file 
// Function filters text file and returns ouch button data that is database-ready
const processUploadedOuchButtonData = (clientId, file) => {
    const lines = file.split('\n'); 
    processedOuchButtonData = [];

    for (const line of lines) {
        if (line.includes('Button ID:') && line.includes('Location:') && line.includes('Date/Time:')) {
            const locationMatch = line.match(/Location: (-?\d+\.\d+),(-?\d+\.\d+)/);
            const dateTimeMatch = line.match(/Date\/Time: (\d+\/\d+\/\d+ \d+:\d+:\d+\.\d+)/);

            if (locationMatch && dateTimeMatch) {
                const buttonIdMatch = line.match(/Button ID: (\d+)/);
                const buttonId = buttonIdMatch ? parseInt(buttonIdMatch[1]) : null; 
                const latitude = parseFloat(locationMatch[1]); 
                const longitude = parseFloat(locationMatch[2]);
                const dateTime = new Date(dateTimeMatch[1]); 

                const jsonData = {
                    OuchButtonID: buttonId,
                    Latitude: latitude, 
                    Longitude: longitude, 
                    Time: dateTime, 
                    ClientID: clientId
                }

                processedOuchButtonData.push(jsonData); 
            }
        }
    }

    return processedOuchButtonData;
}

// Route for uploading ouch button data
router.post('/upload', upload.single('file'), async (req, res) => { 
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Extract uploaded data 
        const clientId = req.body.clientId;
        const file = req.file.buffer.toString(); 

        // Process uploaded data
        const processedOuchButtonData = processUploadedOuchButtonData(clientId, file)

        // Insert into Sequelize model
        const result = await ouchbuttondata.bulkCreate(processedOuchButtonData); 

        res.status(200).json({ message: 'File uploaded and data inserted', result }); 
    } catch (error) {
        console.error('Error uploading file:', error)
        res.status(500).json({ message: 'Error uploading file' }); 
    }
});

module.exports = router;