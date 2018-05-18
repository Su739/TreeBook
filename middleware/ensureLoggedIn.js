module.exports = function ensureLoggedIn() {
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(302).json({error: 'not authentication'});
    }
    next();
  };
};
