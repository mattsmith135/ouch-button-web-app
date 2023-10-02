const { therapistdata } = require('./models');
const bcrypt = require('bcryptjs'); 
const LocalStrategy = require('passport-local').Strategy; 

module.exports = function (passport) {
    passport.use(new LocalStrategy({
            usernameField: 'TherapistEmail', 
            passwordField: 'TherapistPassword', 
        },
        function verify(TherapistEmail, TherapistPassword, done) {
            therapistdata.findOne({ where: { TherapistEmail: TherapistEmail } }, (err, therapist) => {
                if (err) { return done(err); }; 
                if (!therapist) { return done(null, false, { message: "Incorrect username or password." }) }; 

                bcrypt.compare(TherapistPassword, therapist.TherapistPassword, (err, result) => {
                    if (err) { return done(err); };
                    if (result === true) { 
                        return done(null, therapist); 
                    }
                    else {
                        return done(null, false, { message: "Incorrect username or password." }); 
                    }
                })
            }) 
        })
    )  

    passport.serializeUser(function(therapist, cb) {
        process.nextTick(function() {
            return cb(null, {
                TherapistID: therapist.TherapistID, 
                TherapistName: therapist.TherapistName, 
                TherapistEmail: therapist.TherapistEmail, 
                TherapistPassword: therapist.TherapistPassword
            })
        })
    });

    passport.deserializeUser(function(therapist, cb) {
        process.nextTick(function() {
            return cb(null, therapist)
        })
    });
}