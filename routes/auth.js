const express = require('express');
const createUser = require('../authorization/lib/auth-helpers').createUser;
const passport = require('../authorization/lib/local');
const { validUserName, validRegister } = require('../authorization/lib/validator');
const { UserProfile } = require('../db/db-repo');

const router = express.Router();

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin',
    (req.hostname === 'www.lg739.com' || req.hostname === 'http://blog.lg739.com:3000') ? 'http://blog.lg739.com:3000' : 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

/* POST 注册 */
router.post('/register', (req, res, next) => {
  validRegister(req)
    .then(() => {
      createUser(req, res)
        .spread((user, created) => {
          if (!created) {
            res.status(401).json({field: 'username', message: '该用户名已存在,换一个试试吧'});
          }
          passport.authenticate('local', (err, user, info) => {
            if (err) res.status(401).json({error: err.message});
            if (user) {
              const { id, userName } = user;
              UserProfile.create({
                userId: id, nickName: userName, avatr: 'default-avatar.png'
              })
                .then(() => {
                  res.status(200).json({
                    id: user.id, name: user.userName, email: user.email
                  });
                })
                .catch(error => res.status(500).json({error: error.message}));
            }
          })(req, res, next);
        })
        .catch((err) => {
          res.status(500).json({error: err.message});
        });
    })
    .catch(error => res.status(401).json(error));
});

/* POST 登录 */
router.post('/login', (req, res, next) => {
  validUserName(req)
    .then(() => {
      passport.authenticate('local', (err, user, info) => {
        if (err) res.status(401).json({field: 'username', message: err.message});
        if (!user) res.status(401).json({field: 'password', message: '密码错误'});
        if (user) {
          req.logIn(user, function(err) {
            if (err) res.status(500).json({error: err});
            res.cookie('isLogged', true, { expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000), domain: '.lg739.com' });
            res.cookie('userName', req.user.dataValues.userName, { expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000), domain: '.lg739.com' });
            res.status(200).json({
              id: user.id, name: user.userName, email: user.email
            });
          });
        }
      })(req, res, next);
    })
    .catch(error => res.status(401).json(error));
});

/* GET logout. */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.cookie('isLogged', false, { expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000), domain: '.lg739.com' });
  res.cookie('userName', 'null', { expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000), domain: '.lg739.com' });
  res.status(200).json({success: '您已退出登录'});
});

module.exports = router;
