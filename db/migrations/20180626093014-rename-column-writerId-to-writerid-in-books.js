'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.renameColumn('Books', 'writerId', 'writerid'),

  down: (queryInterface, Sequelize) =>
    queryInterface.renameColumn('Books', 'writerid', 'writerId')
};
