const express = require('express');
const passport = require('passport'); 
const bcrypt = require('bcryptjs'); 
const router = express.Router();
const { therapistdata } = require('../models');

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login" 
    }, async (err, user, info) => {
        
        console.log('Test');
        console.log(info); 
         
        if (err) throw err;
        if (!req.user) { 
            res.send("No User Exists"); 
        }
        else {
            req.logIn(req.user, err => {
                if (err) throw err; 
                res.send("Successfully Authenticated"); 
                console.log(req.user); 
            })
        }
    })(req, res, next)
});

router.post('/register', async (req, res) => {
    const [newTherapist, created] = await therapistdata.findOrCreate({
        where: { TherapistEmail: req.body.TherapistEmail },
        defaults: {
            TherapistName: req.body.TherapistName, 
            TherapistEmail: req.body.TherapistEmail, 
            TherapistPassword: await bcrypt.hash(req.body.TherapistPassword, 10)
        }
    });

    if (created) {
        res.send(`User created: ${newTherapist}`);
    } else {
        res.send("User already exists"); 
    }
}); 

router.get('/user', (req, res) => {
    res.send(req.user); 
});

module.exports = router; 