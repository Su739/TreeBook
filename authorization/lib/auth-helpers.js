'user strict';
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');
const User = require('../../db/db-repo').User;

exports.comparePass = Promise.promisify(bcrypt.compare);
/**
 * 返回promise，后面要用spread((user, created)),created是boolean,创建成功后他是true
 */
exports.createUser = function(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return User.findOrCreate({
    where: {userName: req.body.username},
    defaults: {passwordHash: hash, email: req.body.email}
  });
};
