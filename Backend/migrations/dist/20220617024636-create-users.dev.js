'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('users', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              name: {
                type: Sequelize.STRING,
                allowNull: false
              },
              age: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
              email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
              },
              password: {
                type: Sequelize.STRING,
                allowNull: false
              },
              mobile: {
                type: Sequelize.STRING,
                allowNull: false
              },
              skills: {
                type: Sequelize.TEXT
              },
              role_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                  model: 'roles',
                  key: 'id'
                }
              },
              gdo_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                  model: 'gdos',
                  key: 'id'
                }
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              }
            }));

          case 2:
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
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.dropTable('users'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};