'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserProfiles', [{
      userId: 'e1a7fbe0-487b-11e8-8a61-ad7501e91c5a',
      nickName: '胖虎3',
      avatar: '134334.jpeg',
      gender: 'man',
      profession: 'js',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserProfiles', null, {});
  }
};
