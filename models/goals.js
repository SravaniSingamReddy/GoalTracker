'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class goals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  goals.init({
    goal: DataTypes.STRING,
    user_id:DataTypes.INTEGER,
    status:DataTypes.STRING,
    date:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'goals',
  });
  return goals;
};