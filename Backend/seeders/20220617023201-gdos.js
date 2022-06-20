'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('gdos', [
      {
      gdo_name: "GDO1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      gdo_name: "GDO2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      gdo_name: "GDO3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      gdo_name: "GDO4",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      gdo_name: "ALL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },  
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('gdos', null, {});  
  }
};
