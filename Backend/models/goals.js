'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class goals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  goals.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    goal: {
      type: DataTypes.STRING,
      allowNull:false
    },
    user_id: {
      allowNull: false,          
      type: DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      }
    },
    status: {
      type: DataTypes.ENUM('Inprogress', 'Completed', 'Failed'),
      allowNull:false,          
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },                          
    }, {
      sequelize,
    modelName: 'goals',
  });
  return goals;
};




