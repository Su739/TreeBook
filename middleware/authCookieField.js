function authCookieField(req, res, next) {
  console.log(req.cookie);
  const { isLogged } = req.cookies;
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (isLogged) {
      res.cookie('isLogged', false, { expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000) });
      res.cookie('userName', 'null', { expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000) });
    }
    next();
  } else {
    if (!isLogged) {
      res.cookie('isLogged', true, { expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000) });
      res.cookie('userName', req.user.dataValues.userName, { expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000) });
    }
    next();
  }
}

module.exports = authCookieField;
