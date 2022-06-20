'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", queryInterface.bulkInsert('gdos', [{
              gdo_name: "GDO1",
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              gdo_name: "GDO2",
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              gdo_name: "GDO3",
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              gdo_name: "GDO4",
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              gdo_name: "ALL",
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
            return _context2.abrupt("return", queryInterface.bulkDelete('gdos', null, {}));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};