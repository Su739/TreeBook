'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserProfiles', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      nickName: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      profession: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserProfiles');
  }
};
