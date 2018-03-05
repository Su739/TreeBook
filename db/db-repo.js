'use strict';

const conf = JSON.parse(require('./db-postgre')).development;
const Sequelize = require('sequelize');
const { username, password, database, host, port, dialect } = conf;
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port
});
const user = require('./models/user');
exports.testConnection = () => sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
exports.User = user(sequelize, Sequelize);
