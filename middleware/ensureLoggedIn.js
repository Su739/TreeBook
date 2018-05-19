module.exports = function ensureLoggedIn() {
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({error: 'not authentication'});
    }
    next();
  };
};
