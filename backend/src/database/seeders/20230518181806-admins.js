'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('admins', [
      {
        id: 1,
        name: 'Eduarda',
        email: 'eduarda@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
      },
      {
        id: 2,
        name: 'Helena',
        email: 'helena@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
      },
      {
        id: 3,
        name: 'Guilherme',
        email: 'guilherme@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
