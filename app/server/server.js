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

// Login server stuff

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const bcrypt = require('bcrypt');
  const passport = require('passport');
  const flash = require('express-flash');
  const session = require('express-session');
  const methodOverride = require('method-override');
  
  //getting the passort from the passport config file
  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  //temporary storage of users
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
  
  //getting the page index
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  //getting the page login
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  //if login was successfull get index, if not go back to login
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  //getting register
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  //sending the answers from register
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
  
  //when logout i pressed delete the session and go back to login
  app.delete('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
  })
  
  //checks if they have been authenticated
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  //checks if they have been not authenticated
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
  app.listen(3005)