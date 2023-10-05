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
        res.redirect('/login'); // Redirect to login if register is successful
    } else {
        res.send("User already exists"); 
        res.redirect('/register'); // Redirect to register if register fails
    }
}); 

router.delete('/logout', (req, res) => {
    // Use method-override library in-conjunction with HTML form to logout users
    // Ref: https://www.youtube.com/watch?v=-RCnNyD0L-s Skip To Video Time: 33:00 
    req.logOut(); 
    res.redirect('login'); 
})

module.exports = router; 