'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Articles', 'public', 'ispublic');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Articles', 'ispublic', 'public');
  }
};
