const express = require('express'); 
const cors = require('cors');
const mysql = require('mysql'); 

require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT || 5000; 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_user', 
    password: 'your_password', 
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

app.use(cors()); 
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 