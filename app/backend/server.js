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
        console.error('Error connnecting to MySQL database', err); 
    } else {
        console.log('Connected to MySQL database'); 
    }
}); 

// Define API Routes
app.get("/api/get", (req, res) => {
    const sqlSelect = ""; 
    db.query(sqlSelect, (err, result) => {
        res.send(result); 
    }); 
});

app.post("/api/insert", (req, res) => {
    const sqlInsert = "";
    db.query(sqlInsert, (err, result) => {
    
    }); 
});



const port = process.env.PORT || 5000; 

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 