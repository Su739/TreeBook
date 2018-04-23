const Promise = require('bluebird');

/**
 * @param {string} name 用户名
 * @param {Object} options 验证条件
 */
function validUserName(req, options = { minLength: 2, maxLength: 18, pattern: /^[a-zA-Z0-9_]+$/g }) {
  const { minLength = 2, maxLength = 18, pattern = /^[a-zA-Z0-9_]+$/g } = options;
  const username = req.body.username;
  return new Promise((resolve, reject) => {
    if (!username || username.length > maxLength || username.length < minLength || !pattern.test(username)) {
      reject(new Error('用户名应该由2-18个字母、数字或者下划线组成'));
    } else {
      resolve();
    }
  });
}

function validPassword(req, options = { minLength: 8, maxLength: 20 }) {
  const { minLength = 8, maxLength = 20 } = options;
  const password = req.body.password;
  return new Promise((resolve, reject) => {
    if (!password || password.length > maxLength || password.length < minLength) {
      reject(new Error('密码在8-20个字符之间'));
    } else {
      resolve();
    }
  });
}

function validRegister(req, option1, option2) {
  return Promise.all([
    validUserName(req, option1),
    validPassword(req, option2)
  ]);
}

module.exports = {
  validUserName,
  validPassword,
  validRegister
};
