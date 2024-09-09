'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Description extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Description.init({
    description: DataTypes.STRING,
    publisher: DataTypes.STRING(10),
    paperback : DataTypes.STRING(20),
    ISBN_10: DataTypes.STRING(10),
    ISBN_13 : DataTypes.STRING(10),
    weight  : DataTypes.STRING(32),
    dimensions : DataTypes.STRING(20), 
  }, {
    sequelize,
    modelName: 'Description',
  });
  return Description;
};