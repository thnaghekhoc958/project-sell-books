'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    // product_id : DataTypes.INTEGER,
    category_id : DataTypes.INTEGER,
    decription_id : DataTypes.INTEGER,
    title : DataTypes.STRING(350),
    price : DataTypes.INTEGER,
    discount : DataTypes.INTEGER,
    thumbail : DataTypes.STRING(500),
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};