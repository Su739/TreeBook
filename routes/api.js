/**
 * 额，api瞎设计的，200返回的都是object或者string。error都是{error: error.message}这种格式
 */
const express = require('express');
const fs = require('fs');
const { User, Book, Article, UserProfile, Op } = require('../db/db-repo');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const { uploadAvatar, uploadImage } = require('./utils/fileStorage');

const router = express.Router();

/**
 * GET /users/:userId/profile    user's profile
 * GET /a/:id                    article
 * GET /books/:bookId
 * GET /users/:username
 */

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'link');
  res.header('Access-COntrol-Allow-Methods', 'GET, POST, DELETE');
  next();
});

/* POST upload images */
router.post('/upload/image', ensureLoggedIn(), uploadImage, function(req, res, next) {
  if (req.body && req.body.imagename) {
    const imagename = req.body.imagename;
    const a = imagename.slice(0, 1);
    const b = imagename.slice(1, 2);
    const c = imagename.slice(2, 3);
    const filePath = `./public/images/${a}/${b}/${c}/${imagename}`;
    if (fs.existsSync(filePath)) {
      res.status(200).json({success: '上传成功'});
    } else {
      res.status(500).json({errror: '上传失败'});
    }
  }
});

/* POST create or update a book */
router.post('/articles/article', ensureLoggedIn(), function(req, res, next) {
  const { id, title, depth, parent, content, order, ispublic, updatedAt, writerid, superior, abstract } = req.body;// writerid不是articles中的字段，用来判断文章归属
  // 这个parent对应book里面外键id，所以不能少也不能错,剩下的货是not null字段
  // 然后之前犯了一个低级错误，就是这里面的字段(主要是最后一个)可能是0 ！0 为true
  if (!(parent && title && typeof depth === 'number' && typeof order === 'number' && ispublic && typeof superior === 'number')) {
    res.status(500).json({error: '程序有问题请修复！！！缺少必要字段'});
  } else {
    if (req.user && writerid === req.user.dataValues.id) { // 确认登录用户拥有被操作数据
      if (!id || id === -1) {
        Article.create({
          title, depth, parent, content, order, ispublic, updatedAt, superior, abstract, writer: req.user.dataValues.userName
        })
          .then(article => res.status(200).json(article))
          .catch(err => res.status(500).json({error: err.message}));
      } else {
        Article.update({
          title, depth, parent, content, order, ispublic, updatedAt, superior, abstract, writer: req.user.dataValues.userName
        }, {
          where: {id: id},
          returning: true
        })
          .then(([count, article]) => {
            if (count > 0) {
              res.status(200).json(article);
            } else {
              res.status(404).json({error: '程序有问题！！！请求的id不存在'});
            }
          })
          .catch(err => res.status(500).json({error: err.message}));
      }
    } else {
      res.status(500).json({error: '程序有问题请修复！！！不能操作不属于你的账户'});
    }
  }
});

/* POST create or update a book */
router.post('/books/book', ensureLoggedIn(), function(req, res, next) {
  const { id, name, writerid, description, ispublic, company, updatedAt } = req.body;
  // 这个useid对应user里面外键id，所以不能少也不能错,剩下俩货是not null字段
  if (!writerid && !name && !ispublic) {
    res.status(500).json({error: '程序有问题请修复！！！缺少必要字段'});
  } else {
    if (req.user && writerid === req.user.dataValues.id) { // 确认登录用户拥有被操作数据
      if (!id) {
        Book.create({
          name, writerid, description, ispublic, company, updatedAt
        })
          // 每次新建图书，都要为该书增加一个初始页(初始文章)
          .then(book =>
            Article.create({
              title: '前言', depth: 0, parent: book.id, content: '写点什么介绍以下这本书吧。', order: 1, ispublic: true, updatedAt, superior: -1, abstract: book.description, writer: req.user.dataValues.userName
            })
              .then(() => res.status(200).json(book)))
          .catch(err => res.status(500).json({error: err.message}));
      } else {
        Book.update({
          name, writerid, description, ispublic, company, updatedAt
        }, {
          where: {id: id},
          returning: true
        })
          .then(([count, book]) => {
            if (count > 0) {
              res.status(200).json(book);
            } else {
              res.status(404).json({error: '程序有问题！！！请求的id不存在'});
            }
          })
          .catch(err => res.status(500).json({error: err.message}));
      }
    } else {
      res.status(500).json({error: '程序有问题请修复！！！不能操作不属于你的账户'});
    }
  }
});

/* POST create or update profile */
router.post('/users/profile', ensureLoggedIn(), uploadAvatar,
  function(req, res, next) {
    const { userid, nickname, avatar, gender, profession, company, updatedAt } = req.body;
    // 这个useid对应user里面外键id，所以不能少也不能错
    if (!userid) {
      res.status(500).json({error: '程序有问题请修复！！！用户id不存在'});
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
                .catch(err => res.status(500).json({error: err.message}));
            } else {
              res.status(404).json({error: '天啊，userProfile怎么会不存在，程序有问题请修复！！'});
            }
          })
          .catch(err => res.status(500).json({errror: err.message}));
      } else {
        res.status(500).json({error: '有问题！！！不能操作不属于你的账户'});
      }
    }
  });

// 删除一本书
router.delete('/books/:id', ensureLoggedIn(), function(req, res) {
  Book.findById(req.params.id)
    .then(book => {
      if (req.user && book.writerid === req.user.dataValues.id) { // 确认登录用户拥有被操作数据
        Book.destroy({ where: { id: req.params.id }, limit: 1 })
          .then(() => res.status(200).json({entity: 'books', status: 'success', message: '删除成功', id: req.params.id}));
      } else {
        res.status(500).json({error: '有问题！！！不能操作不属于你的账户'});
      }
    })
    .catch(error => res.status(500).json({error: error.message}));
});

// 删除一篇文章
router.delete('/a/:id', ensureLoggedIn(), function(req, res) {
  Article.findById(req.params.id)
    .then(article => {
      if (req.user && article.writer === req.user.dataValues.userName) { // 确认登录用户拥有被操作数据
        Article.destroy({ where: { id: req.params.id }, limit: 1 })
          .then(() => res.status(200).json({entity: 'articles', status: 'success', message: '删除成功', id: req.params.id}));
      } else {
        res.status(500).json({error: '有问题！！！不能操作不属于你的账户'});
      }
    })
    .catch(error => res.status(500).json({error: error.message}));
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
    .catch(error => res.status(500).json({error: error.message}));
});

/* GET user's books. */
router.get('/users/:userId/books', function(req, res, next) {
  Book.findAll({
    where: { writerid: req.params.userId }
  })
    .then(result => {
      if (result && result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({error: '您访问的网址不存在'});
      }
    })
    .catch(error => res.status(500).json({error: error.message}));
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
    .catch(error => res.status(500).json({error: error.message}));
});

/* GET book detail and all the articles of user's book. */
router.get('/books/:bookId', function(req, res, next) {
  Book.findById(req.params.bookId)
    .then(book => {
      if (!book) {
        res.status(404).json({error: '您访问的网址不存在'});
        return;
      }
      if (req.user && book.writerid === req.user.dataValues.id) {
        Article.findAll({
          where: {
            parent: req.params.bookId
          },
          attributes: ['id', 'title', 'superior', 'depth', 'parent', 'order', 'ispublic', 'updatedAt', 'createdAt', 'abstract']
        })
          .then(articles => {
            if (articles) {
              res.status(200).json(Object.assign(book.dataValues, {articles}));
            } else {
              res.status(200).json('书中暂时还没有文章');
            }
          })
          .catch(error => res.status(500).json({error: error.message}));
      } else {
        Article.findAll({
          where: {
            [Op.and]: [
              {parent: req.params.bookId},
              {ispublic: true}
            ]
          },
          attributes: ['id', 'title', 'superior', 'depth', 'parent', 'order', 'ispublic', 'updatedAt', 'createdAt', 'abstract']
        })
          .then(articles => {
            if (articles) {
              res.status(200).json(Object.assign(book.dataValues, {articles}));
            } else {
              res.status(200).json('书中暂时还没有文章');
            }
          })
          .catch(error => res.status(500).json({error: error.message}));
      }
    })
    .catch(error => res.status(500).json({error: error.message}));
});

/* GET user's profile and books detail. */
router.get('/users/:name', function(req, res, next) {
  User.hasOne(UserProfile, {foreignKey: 'userId'});
  if (req.isAuthenticated() && req.user.dataValues.userName === req.params.name) {
    User.hasMany(Book, {foreignKey: 'writerid'});
  } else {
    User.hasMany(Book, {foreignKey: 'writerid', scope: {ispublic: true}});
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
    .catch(error => res.status(500).json({error: error.message}));
});

/* GET articles sort by time desc(eager load) */
/* router.get('/v0/articles', function(req, res, next) {
  Article.belongsTo(Book, {foreignKey: 'article_book_fkey'});
  Book.belongsTo(User, {foreignKey: 'book_user_fkey'});
  const { page = 1, limit = 10 } = req.query;
  Article.findAndCountAll({
    where: { ispublic: true },
    attributes: ['id', 'title', 'superior', 'depth', 'parent', 'order', 'ispublic', 'updatedAt', 'createdAt', 'abstract'],
    order: [['id', 'DESC']],
    offset: (page - 1) * limit,
    limit,
    include: [
      Book,
      User
    ]
  })
    .then(result => {
      if (result.count > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).json({error: '您访问的网址不存在，或者参数超出范围'});
      }
    })
    .catch(error => res.status(500).json({error: error.message}));
}); */
/* GET articles sort by time desc */
router.get('/v0/articles', function(req, res, next) {
  const { page = 1, limit = 10 } = req.query;
  if (page < 0 || limit < 1) {
    res.status(404).json({error: '您访问的网址不存在，或者参数超出范围'});
  }

  Article.findAndCountAll({
    where: { ispublic: true },
    attributes: ['id', 'title', 'superior', 'depth', 'parent', 'order', 'ispublic', 'writer', 'updatedAt', 'createdAt', 'abstract'],
    order: [['id', 'DESC']],
    offset: (page - 1) * limit,
    limit
  })
    .then(result => {
      if (result.count > 0) {
        const pageCount = Math.ceil(result.count / limit);// the last page number

        // add link to the response header
        if (pageCount > 1) {
          if (page === 1) {
            const inFirstPage = `<https://www.lg739.com/api/v0/articles?page=${page + 1}>; rel="next", <https://www.lg739.com/api/v0/articles?page=${pageCount}>; rel="last"`;
            res.append('Link', inFirstPage);
          } else if (page > 1 && page < pageCount) {
            const inMiddlePage = `<https://www.lg739.com/api/v0/articles?page=${page - 1}>; rel="prev", <https://www.lg739.com/api/v0/articles?page=${page + 1}>; rel="next", <https://www.lg739.com/api/v0/articles?page=${pageCount}>; rel="last", <https://www.lg739.com/api/v0/articles?page=1>; rel="first"`;
            res.append('Link', inMiddlePage);
          } else {
            const inLastPage = `<https://www.lg739.com/api/v0/articles?page=${page - 1}>; rel="prev", <https://www.lg739.com/api/v0/articles?page=1>; rel="first"`;
            res.append('Link', inLastPage);
          }
        }

        res.status(200).json(result.rows);
      } else {
        res.status(404).json({error: '您访问的网址不存在，或者参数超出范围'});
      }
    })
    .catch(error => res.status(500).json({error: error.message}));
});

/* GET articles sort by time desc */
router.get('/v0/books', function(req, res, next) {
  const { page = 1, limit = 10 } = req.query;
  Book.findAndCountAll({
    order: [['id', 'DESC']],
    offset: (page - 1) * limit,
    limit
  })
    .then(result => {
      if (result.count > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).json({error: '您访问的网址不存在，或者参数超出范围'});
      }
    })
    .catch(error => res.status(500).json({error: error.message}));
});

module.exports = router;
