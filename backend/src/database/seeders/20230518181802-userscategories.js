'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users_categories', [{
      user_id: 1,
      categories_id: 2,
    },
    {
      user_id: 1,
      categories_id: 3,
    },
    {
      user_id: 2,
      categories_id: 3,
    },
    {
      user_id: 2,
      categories_id: 1,
    },
    {
      user_id: 3,
      categories_id: 1,
    },
    {
      user_id: 4,
      categories_id: 2,
    },
    {
      user_id: 5,
      categories_id: 1,
    },
    {
      user_id: 5,
      categories_id: 2,
    },
    {
      user_id: 5,
      categories_id: 3,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_categories', null, {});
  }
};
