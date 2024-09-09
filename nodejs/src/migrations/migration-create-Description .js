'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Description', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      decription: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING(10)
      },
      paperback: {
        type: Sequelize.STRING(20)
      },
      ISBN_10: {
        type: Sequelize.STRING(10)
      },
      ISBN_13: {
        type: Sequelize.STRING(13)
      },
      weight: {
        type: Sequelize.STRING(32)
      },
      dimensions: {
        type: Sequelize.STRING(20)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Description');
  }
};