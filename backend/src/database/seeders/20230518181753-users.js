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
        created_at: Sequelize.literal('DATE("2023-05-15T13:08:08")'),
        updated_at: Sequelize.literal('DATE("2023-05-20T12:08:08")'),
      },
      {
        id: 2,
        name: 'Maria',
        email: 'maria@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
        total_time: 100,
        created_at: Sequelize.literal('DATE("2023-05-13T12:08:08")'),
        updated_at: Sequelize.literal('DATE("2023-05-22T12:08:08")'),
      },
      {
        id: 3,
        name: 'Luiz',
        email: 'luiz@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
        total_time: 117,
        created_at: Sequelize.literal('DATE("2023-05-13T12:08:08")'),
        updated_at: Sequelize.literal('DATE("2023-05-22T12:08:08")'),
      },
      {
        id: 4,
        name: 'Flávio',
        email: 'flavio@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
        total_time: 12,
        created_at: Sequelize.literal('DATE("2023-05-03T12:08:08")'),
        updated_at: Sequelize.literal('DATE("2023-05-22T12:08:08")'),
      },
      {
        id: 5,
        name: 'Rafaela',
        email: 'rafaela@email.com',
        password: '$2a$10$dod3MblPub.R9pLQO691FuNPxO1WJoJkRQlTMwTxH/ZRNBpL76fpS',
        total_time: 43,
        created_at: Sequelize.literal('DATE("2023-05-10T12:08:08")'),
        updated_at: Sequelize.literal('DATE("2023-05-22T12:08:08")'),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
