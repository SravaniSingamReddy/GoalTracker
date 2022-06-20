'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", queryInterface.bulkInsert('roles', [{
              role_name: "Super Admin",
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              role_name: "Admin",
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              role_name: "Employee",
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
            return _context2.abrupt("return", queryInterface.bulkDelete('roles', null, {}));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};