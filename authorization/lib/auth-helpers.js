'user strict';
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

exports.comparePass = Promise.promisify(bcrypt.compare);
