const path = require('path');

module.exports = {
  entry: '../javascripts/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};
