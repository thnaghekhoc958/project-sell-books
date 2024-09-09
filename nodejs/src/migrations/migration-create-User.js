'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(150)
      },
      phonenumber: {
        type: Sequelize.STRING(20)
      },
      address: {
        type: Sequelize.STRING(200)
      },
      password: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('User');
  }
};