'use strict';

var bcrypt = require("bcrypt");

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", queryInterface.bulkInsert('users', [{
              name: "Sravani",
              age: 20,
              email: "sravani@gmail.com",
              password: bcrypt.hashSync("Password@1234", 7),
              mobile: "7432167890",
              gdo_id: 5,
              skills: "javascript,Node js,React js",
              role_id: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              name: 'Sagar',
              age: 20,
              role_id: 2,
              email: 'sagar@example.com',
              password: bcrypt.hashSync('Password@987', 7),
              mobile: "1234767890",
              skills: "React Redux,Saga,Thunk",
              gdo_id: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              name: 'Pavani',
              age: 20,
              role_id: 2,
              email: 'Pavnai@example.com',
              password: bcrypt.hashSync('panI@987', 7),
              mobile: "0987674321",
              skills: "Node js,React",
              gdo_id: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              name: "Tej",
              age: 20,
              email: "tej@gmail.com",
              password: bcrypt.hashSync("FIve4@One", 7),
              gdo_id: 3,
              mobile: "7647382910",
              skills: "python,java,C",
              role_id: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              name: "Varun",
              age: 20,
              email: "varun@gmail.com",
              password: bcrypt.hashSync("Six4@One", 7),
              gdo_id: 4,
              mobile: "7647382910",
              skills: "python,java,C",
              role_id: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              name: "Raju",
              age: 20,
              email: "raj@gmail.com",
              password: bcrypt.hashSync("Six9@Two", 7),
              gdo_id: 1,
              mobile: "7647382910",
              skills: "python,java,C",
              role_id: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              name: "Rani",
              age: 20,
              email: "rani@gmail.com",
              password: bcrypt.hashSync("Three45@Two", 7),
              gdo_id: 2,
              mobile: "7647382910",
              skills: "python,java,C",
              role_id: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              name: "Kiran",
              age: 20,
              email: "kiran@gmail.com",
              password: bcrypt.hashSync("Ten45@One", 7),
              gdo_id: 3,
              mobile: "7647382910",
              skills: "python,java,C",
              role_id: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              name: "Uma Devi",
              age: 20,
              email: "uma@gmail.com",
              password: bcrypt.hashSync("Ten@12334", 7),
              gdo_id: 4,
              mobile: "7647382910",
              skills: "python,java,C",
              role_id: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            }]));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", queryInterface.bulkDelete('users', null, {}));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};