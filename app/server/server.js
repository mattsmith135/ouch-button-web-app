const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');
const ouchbuttondataRouter = require('./routes/ouchbuttondata');
const clientdataRouter = require('./routes/clientdata');
const therapistRouter = require('./routes/therapist');
const port = process.env.EXPRESS_PORT || 5000;
const db = require('./models');

app.use(cors()); 
app.use('/ouchbuttondata', ouchbuttondataRouter);
app.use('/clientdata', clientdataRouter);
app.use('/therapist', therapistRouter);
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


//Routers


require('dotenv').config(); 




/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    port: process.env.MYSQL_PORT | 3306,
    database: 'ouch_button',
});*/





db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    }); 
});

//Sequelize

/*db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database', err); 
    } else {
        console.log('Connected to MySQL database'); 
    }
}); */

// Define API Routes
/*app.get('/api/get/client/:clientId', (req, res) => {
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



// Start server*/
