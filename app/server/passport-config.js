const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcryptjs'); 
const { therapistdata } = require('./models'); 

module.exports = function (passport) {
    const verify = async (TherapistEmail, TherapistPassword, done) => {
        const therapist = therapistdata.findOne({ where: { TherapistEmail: TherapistEmail } });
        if (therapist == null) {
            return done(null, false, { message: "No user with that email" }); 
        }

        try {
            if (await bcrypt.compare(TherapistPassword, therapist.TherapistPassword)) {
                return done(null, therapist); 
            } else {
                return done(null, false, { message: "Password incorrect" }); 
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'TherapistEmail', passwordField: 'TherapistPassword', }, verify))
    passport.serializeUser((user, done) => done(null, user.TherapistID))
    passport.deserializeUser((id, done) => { 
        return done(null, therapistdata.findOne({ where: { TherapistID: id } }))
    })
}