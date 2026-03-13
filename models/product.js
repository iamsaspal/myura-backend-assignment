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

Product.hasMany(models.OrderItem,{
foreignKey:"product_id"
})

}
  }
  Product.init({
    product_name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};