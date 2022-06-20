"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Goals = require("../models").goals;

var sequelize = require("sequelize");

var _require = require("sequelize"),
    Op = _require.Op;

function createGoals(goal, user_id, status, date) {
  return regeneratorRuntime.async(function createGoals$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", Goals.create({
            goal: goal,
            user_id: user_id,
            status: status,
            date: date
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getAllGoals() {
  return regeneratorRuntime.async(function getAllGoals$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", Goals.findAll());

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getAllGoalsByDate(date, year) {
  return regeneratorRuntime.async(function getAllGoalsByDate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", Goals.findAll({
            where: _defineProperty({}, Op.and, [sequelize.fn('EXTRACT(MONTH from "date") =', date), sequelize.fn('EXTRACT(YEAR from "date") =', year)])
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function updategoal(_ref) {
  var id, goal, status;
  return regeneratorRuntime.async(function updategoal$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = _ref.id, goal = _ref.goal, status = _ref.status;
          console.log(id, goal, status);
          return _context4.abrupt("return", Goals.update({
            goal: goal,
            status: status
          }, {
            where: {
              id: id
            }
          }));

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function updatestatus(_ref2) {
  var id, status;
  return regeneratorRuntime.async(function updatestatus$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = _ref2.id, status = _ref2.status;
          return _context5.abrupt("return", Goals.update({
            status: status
          }, {
            where: {
              id: id
            }
          }));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function editGoal(_ref3) {
  var id, goal;
  return regeneratorRuntime.async(function editGoal$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = _ref3.id, goal = _ref3.goal;
          return _context6.abrupt("return", Goals.update({
            goal: goal
          }, {
            where: {
              id: id
            }
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getGoalsByEmployeeId(user_id) {
  return regeneratorRuntime.async(function getGoalsByEmployeeId$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", Goals.findAll({
            where: {
              user_id: user_id
            }
          }));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function getGoalsByEmployeeIdDate(user_id, month, year) {
  return regeneratorRuntime.async(function getGoalsByEmployeeIdDate$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", Goals.findAll({
            where: _defineProperty({}, Op.and, [{
              user_id: user_id
            }, sequelize.fn('EXTRACT(MONTH from "date") =', month), sequelize.fn('EXTRACT(YEAR from "date") =', year)])
          }));

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function deleteGoal(id) {
  return regeneratorRuntime.async(function deleteGoal$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", Goals.destroy({
            where: {
              id: id
            }
          }));

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
}

module.exports = {
  createGoals: createGoals,
  getAllGoals: getAllGoals,
  updategoal: updategoal,
  editGoal: editGoal,
  updatestatus: updatestatus,
  getGoalsByEmployeeId: getGoalsByEmployeeId,
  getGoalsByEmployeeIdDate: getGoalsByEmployeeIdDate,
  getAllGoalsByDate: getAllGoalsByDate,
  deleteGoal: deleteGoal
};