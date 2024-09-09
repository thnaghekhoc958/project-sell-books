'use strict';
module.exports = {
   
    // discount : DataTypes.INTEGER,
    // thumbail : DataTypes.STRING(500),
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product', {
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      decription_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(350)
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      thumbail: {
        type: Sequelize.STRING(500)
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
    await queryInterface.dropTable('Product');
  }
};