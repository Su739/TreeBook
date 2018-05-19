const express = require('express');
const createUser = require('../authorization/lib/auth-helpers').createUser;
const passport = require('../authorization/lib/local');
const { validUserName, validRegister } = require('../authorization/lib/validator');

const router = express.Router();

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* POST 注册 */
router.post('/register', (req, res, next) => {
  validRegister(req)
    .then(() => {
      createUser(req, res)
        .spread((user, created) => {
          if (!created) {
            res.status(401).json({error: '该用户名已存在,换一个试试吧'});
          }
          passport.authenticate('local', (err, user, info) => {
            if (err) res.status(401).json({error: err.message});
            if (user) {
              res.status(200).json({
                id: user.id, name: user.userName, email: user.email
              });
            }
          })(req, res, next);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({error: '服务器创建用户出错，请联系管理员'});
        });
    })
    .catch(error => res.status(400).json(error.message));
});

/* POST 登录 */
router.post('/login', (req, res, next) => {
  validUserName(req)
    .then(() => {
      passport.authenticate('local', (err, user, info) => {
        if (err) res.status(401).json({error: err.message});
        if (!user) res.status(401).json({error: '密码错误'});
        if (user) {
          req.logIn(user, function(err) {
            if (err) res.status(500).json({error: err});
            res.status(200).json({
              id: user.id, name: user.userName, email: user.email
            });
          });
        }
      })(req, res, next);
    })
    .catch(error => res.status(401).json({error: error.message}));
});

/* GET logout. */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({success: '您已退出登录'});
});

module.exports = router;
