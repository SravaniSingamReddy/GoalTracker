'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('goals', [{
      goal: "Create a todo application",
      status: "Completed",
      date: "2022-04-30",
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      goal: "Learn React Redux",
      status: "Inprogress",
      date: "2022-05-01",
      user_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('goals', null, {});  
  }
};
