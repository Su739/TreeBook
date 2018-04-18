const conf = require('./db-postgre').development;
const Sequelize = require('sequelize');
const { username, password, database, host, port, dialect } = conf;
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port
});
const user = require('./models/user');
const book = require('./models/book');
const article = require('./models/article');
exports.testConnection = () => sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
exports.User = user(sequelize, Sequelize);
exports.Book = book(sequelize, Sequelize);
exports.Article = article(sequelize, Sequelize);
exports.Op = Sequelize.Op;
