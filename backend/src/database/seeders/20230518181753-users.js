'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Carlos Eduardo',
        email: 'carlos@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
        total_time: 50,
      },
      {
        id: 2,
        name: 'Maria',
        email: 'maria@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
        total_time: 150,
      },
      {
        id: 3,
        name: 'Luiz',
        email: 'luiz@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
        total_time: 117,
      },
      {
        id: 4,
        name: 'Flávio',
        email: 'flavio@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
        total_time: 12,
      },
      {
        id: 5,
        name: 'Rafaela',
        email: 'rafaela@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
        total_time: 43,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
