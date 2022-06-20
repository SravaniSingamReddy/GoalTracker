'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", queryInterface.bulkInsert('goals', [{
              goal: "View all Employee Goals",
              status: "Completed",
              date: "2022-04-30",
              user_id: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              goal: "View Employee Goals",
              status: "Inprogress",
              date: "2022-05-01",
              user_id: 2,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              goal: "Learn Employee Goals",
              status: "Inprogress",
              date: "2022-04-01",
              user_id: 3,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              goal: "Learn React Redux",
              status: "Inprogress",
              date: "2022-05-01",
              user_id: 6,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              goal: "Learn Node js",
              status: "Inprogress",
              date: "2022-06-01",
              user_id: 7,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              goal: "Test Ludo App",
              status: "Completed",
              date: "2022-06-01",
              user_id: 8,
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
            return _context2.abrupt("return", queryInterface.bulkDelete('goals', null, {}));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};