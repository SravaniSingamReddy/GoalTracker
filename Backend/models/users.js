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
    role_id: {
      allowNull: false,          
      type: DataTypes.INTEGER,
      references:{
        model:'roles',
        key:'id'
      }},
    gdo_id: {
      allowNull: false,          
      type: DataTypes.INTEGER,
      references:{
        model:'gdos',
        key:'id'
      }},      

  },
  {
    sequelize,
    modelName: 'users',
  });
  return users;
}; 
