const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../db/users/user");

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username}).then(user => {
            if (!user) { done(null, false, {message: "Unknown user!"}); return; }
            bcrypt.compare(password, user.password).then(result => {
                if (!result) done(null, false, {message: "Incorrect password!"});
                else done(null, user.uuid);
            }).catch(err => done(err, false));
        }).catch(err => done(err, false));
    }
));

passport.deserializeUser(function(userUUID, done) {
    User.findOne({uuid: userUUID}).then(user => {
        if (!user) { done(null, false); return; } 
        done(null, user.uuid);
    }).catch(err => done(err, false));
});

passport.serializeUser(function(userUUID, done) {
    done(null, userUUID);
});