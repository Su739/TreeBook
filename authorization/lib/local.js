const passport = require('passport');
const LocalStrategy = require('passport-local').LocalStrategy;

const init = require('./passport');
const User = require('../../db/db-repo').User;
const authHelpers = require('./auth-helpers');

const opts = {};

// 挂载serilizeUser和deserilizeUser
init();
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy(opts, (username, password, cb) => {
  User.findOne({ where: {userName: username} })
    .then(user => {
      if (!user) return cb(null, false);
      authHelpers.comparePass(password, user.password)
        .then(user => cb(null, user))
        .catch(err => cb(err, false));
    })
    .catch(err => { return cb(err); });
}));

module.exports = passport;
