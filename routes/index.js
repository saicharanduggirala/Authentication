const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/', usersController.home);
router.get('/sign-up', usersController.signUp);
router.post('/sign-up/create', usersController.create);
router.get('/sign-in', usersController.signIn);
router.get('/profile', usersController.startSession);
router.get('/sign-out', usersController.endSession);
router.get('/reset', usersController.reset);
router.post('/reset/reset-password', usersController.resetPassword);


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/sign-in',
    successRedirect: '/homepage',
}));

router.post('/profile', passport.authenticate('local', {
    failureRedirect: '/sign-in',
    successRedirect: '/profile',
    successFlash: true,
    failureFlash: true
}));

router.get('/homepage', passport.checkAuthentication, (req, res) => {
    res.render('profile');
});

// router.post('/homepage',
//     passport.checkAuthentication, 
//     (req, res) => {
//         res.render('profile');
//     });

console.log("Routers are loaded");


module.exports = router;