'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },      
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    age:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skills: {
      type: DataTypes.TEXT
    },  
    role: {
      type: DataTypes.ENUM('Employee','Admin','Super Admin'),
      allowNull:false
    },
    gdo: {
      type: DataTypes.ENUM('GDO1', 'GDO2', 'GDO3', 'GDO4', 'ALL'),
      allowNull:false
    },      

  },
  {
    sequelize,
    modelName: 'users',
  });
  return users;
}; 
