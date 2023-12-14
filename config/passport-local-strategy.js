const passport = require("passport");
const User = require("../models/user");


const LocalStrategy = require('passport-local').Strategy;



passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},

    function (req, email, password, done) {
        // find a user and establish the identity
        User.findOne({ email: email })
            .then(function (user) {
                if (!user || user.password !== password) {
                    req.flash('error', "Invalid Username/Password");
                    console.log('Invalid Username/Password');
                    return done(null, false);
                }
                req.flash('success', "Login successful");
                return done(null, user);
            })
            .catch(function (err) {
                console.log('Error in finding user--> Passport', err);
                return done(err);
            });
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        if (err) {
            console.log('Error in finding user-->Passport');
            return done(err);
        }
    })
});

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {

        return next();
    }
    return res.redirect('/sign-in');
};



module.exports = passport;