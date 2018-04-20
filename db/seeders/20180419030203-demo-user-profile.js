'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserProfiles', [{
      userId: 'c1be8eb0-43db-11e8-82b6-0349fb3cde29',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserProfiles', null, {});
  }
};
