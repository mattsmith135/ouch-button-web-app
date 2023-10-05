const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');
const expressSession = require('express-session'); 
const passport = require('passport'); 
const db = require('./models');
const port = process.env.EXPRESS_PORT || 5000; 
const ouchbuttondataRouter = require('./routes/ouchbuttondata');
const clientdataRouter = require('./routes/clientdata');
const therapistdataRouter = require('./routes/therapistdata');
const authRouter = require('./routes/auth'); 
const cookieParser = require('cookie-parser');

require('dotenv').config(); 

// Middleware

require('./passport-config')(passport); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})); 
app.use(cookieParser(process.env.SESSION_SECRET)); 
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
}));
app.use(passport.initialize()); 
app.use(passport.session());

// Routers
app.use('/ouchbuttondata', ouchbuttondataRouter);
app.use('/clientdata', clientdataRouter);
app.use('/therapistdata', therapistdataRouter);
app.use('/auth', authRouter); 

// Sequelize
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    }); 
});