const User = require('../models/user');

module.exports.home = function (req, res) {
  return res.render("home");
}

module.exports.signUp = function (req, res) {
  return res.render("sign-up");
}

module.exports.signIn = function (req, res) {
  return res.render("sign-in");
}

module.exports.reset = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render('reset-password');
  }
  return res.redirect('/sign-in');
}

module.exports.create = function (req, res) {

  if (req.body.confirm_password != req.body.password) {
    req.flash('error', "Passwords don't match,Please try again")
    return res.redirect('back');
  } else {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        req.flash('success', 'Account created successfully! You can now sign in.');
        return res.redirect("/sign-in");
      }
      req.flash('error', 'Email already in use. Please use a different email.');
      return res.redirect("/sign-in");
    }).catch((err) => {
      console.log(err, "Error in signing up!");
      req.flash('error', 'Internal Server Error. Please try again later.');
      return res.status(500).send("Internal Server Error");
    })
  };
};

// module.exports.startSession = function (req, res) {
// User.findOne({email:req.body.email}).then((user)=>{
//     if(user){
//         if(user.password != req.body.password){
//             return res.redirect("back");
//         }

//         return res.render('profile')
//     }

//     return res.redirect('back');
// })
// }

module.exports.startSession = function (req, res) {
  return res.render('profile');
}

module.exports.endSession = function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.flash('success', 'Logged Out Successfully');
    res.redirect('/');

  });
};


module.exports.resetPassword = function (req, res) {
  const { email, newPassword } = req.body;

  // Step 1: Find the user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'User not found,please try again');
        return res.status(404).json({ error: 'User not found' });
      }

      // Step 2: Update the user's password
      user.password = newPassword;

      // Step 3: Save the updated user to the database
      user.save()
        .then(() => {
          req.flash('success', 'User password updated successfully');
          return res.redirect('back');
        })
        .catch((error) => {
          console.error(error);
          req.flash('error', 'Failed to save updated user');
          res.status(500).json({ error: 'Failed to save updated user' });
        });
    })
    .catch((error) => {
      console.error(error);
      req.flash('error', 'Internal server error');
      res.status(500).json({ error: 'Internal server error' });
    });
};

