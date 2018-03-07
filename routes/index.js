const express = require('express');
const router = express.Router();

const authHelpers = require('../authorization/lib/auth-helpers');
const passport = require('../authorization/lib/local');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST 注册 */
router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req, res)
    .spread((user, created) => {
      if (!created) {
        res.status(400).json({status: 'warning', message: '该用户名已存在客户端中'});
      }
      passport.authenticate('local', (err, user, info) => {
        if (err) res.status(500).json({status: 'authenticate-error', error: err});
        if (user) {
          res.status(200).json({status: 'success', user: user});
        }
      })(req, res, next);
    })
    .catch((err) => {
      res.status(500).json({status: 'createuser-error', error: err});
    });
});

/* POST 登录 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) res.status(500).json({status: 'authenticate-error', error: err});
    if (!user) res.status(404).json({status: 'not found user'});
    if (user) {
      req.logIn(user, function(err) {
        if (err) res.status(500).json({status: 'login-error', error: err});
        res.status(200).json({status: 'success', user: user});
      });
    }
  })(req, res, next);
});

module.exports = router;
