'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },      
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      age:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false
      } ,  
      role: {
        type: Sequelize.ENUM('Employee','Admin','Super Admin'),
        allowNull:false
      },
      gdo: {
        type: Sequelize.ENUM('GDO1', 'GDO2', 'GDO3', 'GDO4', 'ALL'),
        allowNull:false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};