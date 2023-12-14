const passport = require('passport');
const env=require('./environment');

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url,
},

    // function(accessToken,refreshToken,profile,done){
    //     User.findOne({email:profile.emails[0].value}).exec().then((user)=>{
    // console.log(profile);

    // if(user){
    //     return done(null,user);
    // }else{
    //     User.create({
    //         name:profile.name,
    //         email:profile.emails[0].value,
    //         password:crypto.randomBytes(20).toString('hex')
    //     }.then((user)=>{
    // return done(null,user);
    //     }).catch((err)=>{
    //         console.log(err,"Error in creating a new User credential through google")
    //     }))
    // }


    //     }).catch((err)=>{
    // console.log(err,"Error in callback function!");
    //     })
    // }

    // ));


    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value })
            .exec()
            .then((user) => {
                // console.log(accessToken, refreshToken);
                // console.log(profile);

                if (user) {
                    return done(null, user);
                } else {
                    User.create({
                        name: `${profile.name.familyName} ${profile.name.givenName}`,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                    })
                        .then((user) => {
                            return done(null, user);
                        })
                        .catch((err) => {
                            console.log(
                                err,
                                "Error in creating a new User credential through google"
                            );
                        });
                }
            })
            .catch((err) => {
                console.log(err, "Error in callback function!");
            });
    }
));






module.exports = passport;