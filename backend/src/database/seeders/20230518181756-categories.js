'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Português',
      },
      {
        id: 2,
        name: 'Estatística',
      },
      {
        id: 3,
        name: 'Química',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('categories', null, {});
  }
};
