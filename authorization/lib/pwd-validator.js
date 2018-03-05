'use strict';

/**
 * @param {Object} opts 验证条件
 */
module.exports = function(opts) {
  return function(req, res, next) {
    next();
  };
};
