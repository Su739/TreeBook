'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('Articles', 'writer', {
      type: Sequelize.STRING,
      allowNull: false
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('Articles', 'writer', {
      type: Sequelize.STRING,
      allowNull: true
    })
};
