"use strict";

var Users = require("../models").users;

var bcrypt = require('bcrypt');

function createUser(_ref) {
  var name, age, email, password, mobile, skills, gdo, role;
  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = _ref.name, age = _ref.age, email = _ref.email, password = _ref.password, mobile = _ref.mobile, skills = _ref.skills, gdo = _ref.gdo, role = _ref.role;
          password = bcrypt.hashSync(password, 7);
          return _context.abrupt("return", Users.create({
            name: name,
            age: age,
            email: email,
            password: password,
            mobile: mobile,
            skills: skills,
            gdo: gdo,
            role: role
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getAllUsers() {
  return regeneratorRuntime.async(function getAllUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", Users.findAll());

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getAllUsersByGDO(gdovalue) {
  return regeneratorRuntime.async(function getAllUsersByGDO$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", Users.findAll({
            where: {
              gdo: gdovalue
            }
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getAllEmployeesByGDO(gdovalue) {
  return regeneratorRuntime.async(function getAllEmployeesByGDO$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", Users.findAll({
            where: {
              gdo: gdovalue,
              role: ["Employee"]
            }
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getAdminByGDO(gdovalue) {
  return regeneratorRuntime.async(function getAdminByGDO$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log(gdovalue);
          return _context5.abrupt("return", Users.findAll({
            where: {
              gdo: gdovalue,
              role: ["Admin"]
            }
          }));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function getAllAdmins() {
  return regeneratorRuntime.async(function getAllAdmins$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", Users.findAll({
            where: {
              role: "Admin"
            }
          }));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getSuperAdmin() {
  return regeneratorRuntime.async(function getSuperAdmin$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", Users.findAll({
            where: {
              role: "Super Admin"
            }
          }));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getAllUsersByGDO: getAllUsersByGDO,
  getAllEmployeesByGDO: getAllEmployeesByGDO,
  getAllAdmins: getAllAdmins,
  getSuperAdmin: getSuperAdmin,
  getAdminByGDO: getAdminByGDO
};