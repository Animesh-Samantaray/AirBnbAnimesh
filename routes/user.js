const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport');
const { isLoggedIn, saveRedirectUrl } = require('../middleware.js');

// =======================
// Signup
// =======================
router.get('/signup', (req, res) => {
  res.render('../views/users/signup.ejs');
});

router.get('/', (req, res) => {
  res.send('user home page');
});

router.post('/signup', async (req, res) => {
  let { username, email, password } = req.body;
  let newUser = new User({ username, email });

  try {
    const nowUser = await User.register(newUser, password);
    console.log(nowUser);
    req.flash('success', 'Registered successfully! Please login.');
    res.redirect('/user/login');
  } catch (err) {
    console.error(err);
    req.flash('error', 'User already registered.');
    res.redirect('/user/signup');
  }
});

// =======================
// Login
// =======================
router.get('/login', (req, res) => {
  res.render('../views/users/login.ejs');
});

// Save redirect URL before authentication
router.post(
  '/login',
  saveRedirectUrl,
  passport.authenticate('local', {
    failureRedirect: '/user/login',
    failureFlash: true,
  }),
  (req, res) => {
    // Redirect to saved URL or fallback
    const redirectUrl = res.locals.redirectUrl || '/listing';
    req.flash('success', 'Welcome back!');
    res.redirect(redirectUrl);
  }
);

// =======================
// Logout
// =======================
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success', 'Logged out successfully.');
    res.redirect('/user/login');
  });
});

module.exports = router;
