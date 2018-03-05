'use strict';
const passport = require('passport');
const User = require('../../db/db-repo').User;

module.exports = () => {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id)
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        cb(err, null);
      });
  });
};
