function authCookieField(req, res, next) {
  const { isLogged } = req.cookies;
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (isLogged) {
      res.cookie('isLogged', false, { expires: new Date(Date.now() + 10 * 60 * 60 * 24) });
      res.cookie('userName', null, { expires: new Date(Date.now() + 10 * 60 * 60 * 24) });
    }
    next();
  } else {
    if (!isLogged) {
      res.cookie('isLogged', true, { expires: new Date(Date.now() + 10 * 60 * 60 * 24) });
      res.cookie('userName', req.user.dataValues.userName, { expires: new Date(Date.now() + 10 * 60 * 60 * 24) });
    }
    next();
  }
}

module.exports = authCookieField;
