'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      depth: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      parent: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ispublic: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Articles');
  }
};
