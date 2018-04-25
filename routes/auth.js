const express = require('express');
const createUser = require('../authorization/lib/auth-helpers').createUser;
const passport = require('../authorization/lib/local');
const { validUserName, validRegister } = require('../authorization/lib/validator');

const router = express.Router();

/* POST 注册 */
router.post('/register', (req, res, next) => {
  validRegister(req)
    .then(() => {
      createUser(req, res)
        .spread((user, created) => {
          if (!created) {
            res.status(400).json('该用户名已存在');
          }
          passport.authenticate('local', (err, user, info) => {
            if (err) res.status(500).json({status: 'authenticate-error', error: err});
            if (user) {
              res.status(200).json('register success');
            }
          })(req, res, next);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({status: 'createuser-error', error: err});
        });
    })
    .catch(error => res.status(400).json(error.message));
});

/* POST 登录 */
router.post('/login', (req, res, next) => {
  validUserName(req)
    .then(() => {
      passport.authenticate('local', (err, user, info) => {
        if (err) res.status(500).json({status: 'authenticate-error', error: err});
        if (!user) res.status(404).json('not found user');
        if (user) {
          req.logIn(user, function(err) {
            if (err) res.status(500).json({status: 'login-error', error: err});
            res.status(200).json({
              id: user.id, name: user.userName, email: user.email
            });
          });
        }
      })(req, res, next);
    })
    .catch(error => res.status(400).json(error.message));
});

/* GET logout. */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json('success log out');
});

module.exports = router;
