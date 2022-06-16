'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: "Sravani",
        age: 20,
        email: "sravani@gmail.com",
        password: bcrypt.hashSync("Password@1234", 7),
        mobile:"7432167890",
        gdo: "ALL",
        skills:"javascript,Node js,React js",          
        role:"Super Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
    
    },
  {
      name: 'Sagar',
      age:20,   
      role: 'Admin',
      email: 'sagar@example.com',
      password: bcrypt.hashSync('Password@987', 7),
      mobile:"1234767890",
      skills:"React Redux,Saga,Thunk",      
      gdo:'GDO1',
      createdAt: new Date(),
      updatedAt: new Date(),
    
    },{
    name: 'Pavani',
    age:20,
    role: 'Admin',
    email: bcrypt.hashSync('Pavnai@example.com', 7),
    password:'panI@987',
    mobile:"0987674321",
    skills:"Node js,React",      
    gdo:'GDO2',
    createdAt: new Date(),
    updatedAt: new Date(),
  
  },
  {
      name: "Tej",
      age:20,
      email: "tej@gmail.com",
      password: bcrypt.hashSync("FIve4@One", 7),
      gdo: "GDO3",
      mobile:"7647382910",
      skills:"python,java,C",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    
  },
  {
    name: "Varun",
    age:20,
    email: "varun@gmail.com",
    password: bcrypt.hashSync("Six4@One", 7),
    gdo: "GDO4",
    mobile:"7647382910",
    skills:"python,java,C",
    role: "Admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  
},
  {
    name: "Raju",
    age:20,
    email: "raj@gmail.com",
    password: bcrypt.hashSync("Six9@Two", 7),
    gdo: "GDO1",
    mobile:"7647382910",
    skills:"python,java,C",
    role: "Employee",
    createdAt: new Date(),
    updatedAt: new Date(),
  
},
{
  name: "Rani",
  age:20,
  email: "rani@gmail.com",
  password: bcrypt.hashSync("Three45@Two", 7),
  gdo: "GDO2",
  mobile:"7647382910",
  skills:"python,java,C",
  role: "Employee",
  createdAt: new Date(),
  updatedAt: new Date(),
}  
,
{
  name: "Kiran",
  age:20,
  email: "kiran@gmail.com",
  password: bcrypt.hashSync("Ten45@One", 7),
  gdo: "GDO3",
  mobile:"7647382910",
  skills:"python,java,C",
  role: "Employee",
  createdAt: new Date(),
  updatedAt: new Date(),
}  
,
{
  name: "Uma Devi",
  age:20,
  email: "uma@gmail.com",
  password: bcrypt.hashSync("Ten@12334", 7),
  gdo: "GDO4",
  mobile:"7647382910",
  skills:"python,java,C",
  role: "Employee",
  createdAt: new Date(),
  updatedAt: new Date(),
}  

  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
