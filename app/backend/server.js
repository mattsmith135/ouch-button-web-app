const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');
const mysql = require('mysql'); 

require('dotenv').config(); 

const app = express();
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors()); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'ouch_button',
}); 

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database', err); 
    } else {
        console.log('Connected to MySQL database'); 
    }
}); 

// Define API Routes
app.get('/api/get/client/:clientId', (req, res) => {
    const clientId = req.params.clientId; 
    
    const sqlSelect = `SELECT * FROM client WHERE clientID = ${clientId}`; 
    
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err); 
            res.sendStatus(500); 
            return; 
        }
        res.send(result); 
    }); 
});

app.get('/api/get/client/:clientId/ouchbuttondata', (req, res) => {
    const clientId = req.params.clientId;

    const sqlSelect = `SELECT * FROM ouchbuttondata WHERE clientID = ${clientId}`; 

    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err); 
            res.sendStatus(500); 
            return; 
        }
        res.send(result); 
    });
});

const port = process.env.PORT || 5000; 

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 