'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        name: '故事汇',
        writerId: 'e1a7fbe0-487b-11e8-8a61-ad7501e91c5a',
        description: '兄弟，讲故事的不应该时zj大哥么',
        public: true,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      },
      {
        name: '故事汇2',
        writerId: 'e1a7fbe0-487b-11e8-8a61-ad7501e91c5a',
        description: '兄弟，讲故事的不应该时zj大哥么',
        public: true,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
