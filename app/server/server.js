const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');
const ouchbuttondataRouter = require('./routes/ouchbuttondata');
const clientdataRouter = require('./routes/clientdata');
const therapistdataRouter = require('./routes/therapistdata');
const port = process.env.EXPRESS_PORT || 5000;
const db = require('./models');

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