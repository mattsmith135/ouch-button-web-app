const express = require('express');
const passport = require('passport'); 
const bcrypt = require('bcrypt'); 
const router = express.Router();
const { therapistdata } = require('../models');

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login" 
    }, async (err, user, info) => {
        if (err) throw err;
        if (!user) { 
            res.send("No User Exists With That Username And Password"); 
        }
        else {
            req.logIn(user, err => {
                if (err) throw err; 
                res.send("Successfully Authenticated"); 
                console.log(user); 
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