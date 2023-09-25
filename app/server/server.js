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

// Login server code

const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

// Temporary storage of users
const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

// If login was successfu, get index
// If not, go back to login
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

// Pushing the answers from register into storage
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

// When logout is pressed, delete the session and go back to login
app.delete('/logout', (req, res) => {
  req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}