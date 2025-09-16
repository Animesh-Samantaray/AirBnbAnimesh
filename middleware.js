
const isLoggedIn = (req, res, next) => {
  console.log(req.path, ".....", req.originalUrl);
  
 
  req.session.redirectUrl = req.originalUrl;

  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in first!');
    return res.redirect('/user/login');
  }

  next();
};


const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports = {
  isLoggedIn,
  saveRedirectUrl
};
