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
      },
      skills: {
        type: Sequelize.TEXT
      },  
      role_id: {
        allowNull: false,          
        type: Sequelize.INTEGER,
        references:{
          model:'roles',
          key:'id'
        }
      },
      gdo_id: {
        allowNull: false,          
        type: Sequelize.INTEGER,
        references:{
          model:'gdos',
          key:'id'
        }        
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

