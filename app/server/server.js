const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');
const ouchbuttondataRouter = require('./routes/ouchbuttondata');
const clientdataRouter = require('./routes/clientdata');
const therapistdataRouter = require('./routes/therapistdata');
const port = process.env.EXPRESS_PORT || 5000;
const db = require('./models');
const multer = require('multer');
const path = require('path'); 

require('dotenv').config(); 

// Routers
app.use(cors()); 
app.use('/ouchbuttondata', ouchbuttondataRouter);
app.use('/clientdata', clientdataRouter);
app.use('/therapistdata', therapistdataRouter);
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Sequelize
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    }); 
});

// Define a storage engine for Multer to store uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for handling file uploads
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Process the uploaded file 
        const content = req.file.buffer.toString();
        
        console.log(content); 

        // Insert into Sequelize model
        // TBC

        // res.status(200).json({ message: 'File uploaded and data inserted', result }); 
    } catch (error) {
        console.error('Error uploading file:', error)
        res.status(500).json({ message: 'Error uploading file' }); 
    }
})
