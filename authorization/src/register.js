'use strict';
const bcrypt = require('bcryptjs');
const User = require('../../db/db-repo').User;

module.exports = function() {
  return function (req, res, next) {
    const name = req.body.user;
    const pwd = req.body.password;
    const email = req.body.email;

    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        next(err);
      }
      bcrypt.hash(pwd, salt, function(err, hash) {
        if (err) {
          next(err);
        }
        User.findOrCreate({ where: {userName: name}, defaults: {password: pwd, email: email} })
          .spread((user, created) => {
            if (!created) {
              res.json({ error: '用户名已存在' });
            }
            // 这里要改，可能那些next(err)都要弄
            res.end();
          })
          .catch((err) => {
            next(err);
          });
      });
    });
  };
};
