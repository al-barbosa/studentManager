'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Matemática',
      },
      {
        id: 2,
        name: 'Biologia',
      },
      {
        id: 3,
        name: 'Química',
      },
      {
        id: 4,
        name: 'Física',
      },
      {
        id: 5,
        name: 'Geometria',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('categories', null, {});
  }
};
