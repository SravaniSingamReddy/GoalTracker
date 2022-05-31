'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: "Sravani",
        age: 20,
        email: "sravani@gmail.com",
        password: "password@1234",
        mobile:"5432167890",
        gdo: "All",
        role:"superadmin",
        createdAt: new Date(),
      updatedAt: new Date(),
    
    },
  {
      name: 'Sagar',
      age:20,
      role: 'Employee',
      email: 'sagar@example.com',
      password:'password@987',
      mobile:"1234567890",
      gdo:'GDO1',createdAt: new Date(),
      updatedAt: new Date(),
    
    },{
    name: 'Pavani',
    age:20,
    role: 'Employee',
    email: 'pavnai@example.com',
    password:'panI@987',
    mobile:"0987654321",
    gdo:'GDO2',createdAt: new Date(),
    updatedAt: new Date(),
  
  },
  {
      name: "Tej",
      age:20,
      email: "tejn@gmail.com",
      password: "fIve@One",
      gdo: "GDO1",
      mobile:"5647382910",
      role: "Admin",createdAt: new Date(),
      updatedAt: new Date(),
    
  }
    
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
