'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_requests', [
      {
        user_id: 1,
        category_id: 1,
      },
      {
        user_id: 3,
        category_id: 3,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_requests', null, {});
  }
};
