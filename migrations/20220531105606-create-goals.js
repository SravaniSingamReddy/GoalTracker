'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('goals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      goal: {
        type: Sequelize.STRING,
        allowNull:false
      },
      user_id: {
        allowNull: false,          
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull:false,          
      },
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('goals');
  }
};