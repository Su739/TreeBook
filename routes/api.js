const express = require('express');
const fs = require('fs');
const { User, Book, Article, UserProfile, Op } = require('../db/db-repo');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const { uploadAvatar, uploadImage } = require('./utils/fileStorage');

const router = express.Router();

/**
 * GET /users/:userId/profile    user's profile
 * GET /a/:id                    article
 * GET /books/:bookId
 * GET /users/:username
 */

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* POST upload images */
router.post('/upload/image', ensureLoggedIn('/login'), uploadImage, function(req, res, next) {
  if (req.body && req.body.imagename) {
    const imagename = req.body.imagename;
    const a = imagename.slice(0, 1);
    const b = imagename.slice(1, 2);
    const c = imagename.slice(2, 3);
    const filePath = `./public/images/${a}/${b}/${c}/${imagename}`;
    if (fs.existsSync(filePath)) {
      res.status(200).json('上传成功');
    } else {
      res.status(500).json('上传失败');
    }
  }
});

/* POST create or update a book */
router.post('/articles/article', ensureLoggedIn('/login'), function(req, res, next) {
  const { id, title, depth, parent, content, order, ispublic, updatedAt, writerid } = req.body;// writerid不是articles中的字段，用来判断文章归属
  // 这个parent对应book里面外键id，所以不能少也不能错,剩下的货是not null字段
  if (!(parent && title && depth && order && ispublic)) {
    res.status(500).json('程序有问题请修复！！！用户id不存在');
  } else {
    if (req.user && writerid === req.user.dataValues.id) { // 确认登录用户拥有被操作数据
      if (!id) {
        Article.create({
          title, depth, parent, content, order, public: ispublic, updatedAt
        })
          .then(article => res.status(200).json(article))
          .catch(err => res.status(500).json(err.message));
      } else {
        Article.update({
          title, depth, parent, content, order, public: ispublic, updatedAt
        }, {
          where: {id: id},
          returning: true
        })
          .then(([count, article]) => {
            if (count > 0) {
              res.status(200).json(article);
            } else {
              res.status(404).json('程序有问题！！！请求的id不存在');
            }
          })
          .catch(err => res.status(500).json(err.message));
      }
    } else {
      res.status(500).json('程序有问题请修复！！！不能操作不属于你的账户');
    }
  }
});

/* POST create or update a book */
router.post('/books/book', ensureLoggedIn('/login'), function(req, res, next) {
  const { id, name, writerid, description, ispublic, company, updatedAt } = req.body;
  // 这个useid对应user里面外键id，所以不能少也不能错,剩下俩货是not null字段
  if (!writerid && !name && !ispublic) {
    res.status(500).json('程序有问题请修复！！！用户id不存在');
  } else {
    if (req.user && writerid === req.user.dataValues.id) { // 确认登录用户拥有被操作数据
      if (!id) {
        Book.create({
          name, writerId: writerid, description, public: ispublic, company, updatedAt
        })
          .then(book => res.status(200).json(book))
          .catch(err => res.status(500).json(err.message));
      } else {
        Book.update({
          name, writerId: writerid, description, public: ispublic, company, updatedAt
        }, {
          where: {id: id},
          returning: true
        })
          .then(([count, book]) => {
            if (count > 0) {
              res.status(200).json(book);
            } else {
              res.status(404).json('程序有问题！！！请求的id不存在');
            }
          })
          .catch(err => res.status(500).json(err.message));
      }
    } else {
      res.status(500).json('程序有问题请修复！！！不能操作不属于你的账户');
    }
  }
});

/* POST create or update profile */
router.post('/users/profile', ensureLoggedIn('/login'), uploadAvatar,
  function(req, res, next) {
    const { userid, nickname, avatar, gender, profession, company, updatedAt } = req.body;
    // 这个useid对应user里面外键id，所以不能少也不能错
    if (!userid) {
      res.status(500).json('程序有问题请修复！！！用户id不存在');
    } else {
      if (req.user && userid === req.user.dataValues.id) { // 确认登录用户拥有被操作数据
        UserProfile.findOrCreate({where: {userId: userid}})
          .spread((profile, created) => {
            if (profile) {
              UserProfile.update({
                nickName: nickname, avatar, gender, profession, company, updatedAt
              }, {
                where: {userId: userid},
                returning: true
              })
                .then(([count, profile]) => {
                  res.status(200).json(profile);
                })
                .catch(err => res.status(500).json(err.message));
            } else {
              res.status(404).json('天啊，怎么会不存在，程序有问题请修复！！');
            }
          })
          .catch(err => res.status(500).json(err.message));
      } else {
        res.status(500).json('有问题！！！不能操作不属于你的账户');
      }
    }
  });

/* GET user's profile. */
router.get('/users/:userId/profile', function(req, res, next) {
  UserProfile.findById(req.params.userId)
    .then(profile => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({error: '您访问的网址不存在'});
      }
    })
    .catch(error => res.status(500).json(error.message));
});

/* GET article by id */
router.get('/a/:id', function(req, res, next) {
  Article.findById(req.params.id)
    .then(article => {
      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json({error: '您访问的网址不存在'});
      }
    })
    .catch(error => res.status(500).json({error}));
});

/* GET book detail and all the articles of user's book. */
router.get('/books/:bookId', function(req, res, next) {
  Book.findById(req.params.bookId)
    .then(book => {
      if (!book) {
        res.status(404).json({error: '您访问的网址不存在'});
        return;
      }
      if (req.user && book.writerId === req.user.dataValues.id) {
        Article.findAll({
          where: {
            parent: req.params.bookId
          },
          attributes: ['id', 'title', 'depth', 'parent', 'order', 'public', 'updatedAt']
        })
          .then(articles => {
            if (articles) {
              res.status(200).json(Object.assign(book.dataValues, {articles}));
            } else {
              res.status(200).json({message: '书中暂时还没有文章'});
            }
          })
          .catch(error => res.status(500).json(error));
      } else {
        Article.findAll({
          where: {
            [Op.and]: [
              {parent: req.params.bookId},
              {public: true}
            ]
          },
          attributes: ['id', 'title', 'depth', 'parent', 'order', 'public', 'updatedAt']
        })
          .then(articles => {
            if (articles) {
              res.status(200).json(Object.assign(book.dataValues, {articles}));
            } else {
              res.status(200).json({message: '书中暂时还没有文章'});
            }
          })
          .catch(error => res.status(500).json(error.message));
      }
    })
    .catch(error => res.status(500).json(error.message));
});

/* GET user's profile and books detail. */
router.get('/users/:name', function(req, res, next) {
  User.hasOne(UserProfile, {foreignKey: 'userId'});
  if (req.isAuthenticated() && req.user.dataValues.userName === req.params.name) {
    User.hasMany(Book, {foreignKey: 'writerId'});
  } else {
    User.hasMany(Book, {foreignKey: 'writerId', scope: {public: true}});
  }
  User.findOne({
    where: {
      userName: req.params.name
    },
    attributes: ['id', 'userName', 'email'],
    include: [
      UserProfile,
      Book
    ]
  })
    .then(user => {
      if (user) {
        res.status(200).json(user);
        return;
      }
      res.status(404).json({error: '您访问的网址不存在'});
    })
    .catch(error => res.status(500).json(error.message));
});

module.exports = router;
