'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('goals', [{
      goal: "View all Employee Goals",
      status: "Completed",
      date: "2022-04-30",
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      goal: "View Employee Goals",
      status: "Inprogress",
      date: "2022-05-01",
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },    
    {
      goal: "Learn Employee Goals",
      status: "Inprogress",
      date: "2022-04-01",
      user_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      goal: "Learn React Redux",
      status: "Inprogress",
      date: "2022-05-01",
      user_id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      goal: "Learn Node js",
      status: "Inprogress",
      date: "2022-06-01",
      user_id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      goal: "Test Ludo App",
      status: "Completed",
      date: "2022-06-01",
      user_id: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('goals', null, {});  
  }
};
