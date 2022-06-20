"use strict";

var Users = require("../models").users;

var Roles = require("../models").roles;

var bcrypt = require('bcrypt');

Roles.belongsTo(Users, {
  targetKey: "role_id",
  foreignKey: "id"
}); //Gdo.belongsTo(Users,{targetKey:"gdoid",foreignKey:"id"});

function createUser(_ref) {
  var name, age, email, password, mobile, skills, gdo_id, role_id;
  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = _ref.name, age = _ref.age, email = _ref.email, password = _ref.password, mobile = _ref.mobile, skills = _ref.skills, gdo_id = _ref.gdo_id, role_id = _ref.role_id;
          password = bcrypt.hashSync(password, 7);
          return _context.abrupt("return", Users.create({
            name: name,
            age: age,
            email: email,
            password: password,
            mobile: mobile,
            skills: skills,
            gdo_id: gdo_id,
            role_id: role_id
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getUserDetails(user_id) {
  return regeneratorRuntime.async(function getUserDetails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("==========");
          console.log(user_id);
          return _context2.abrupt("return", Users.findAll({
            where: {
              id: user_id
            }
          }));

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/*async function getAllAdmins() {
  return Users.findAll({    
    where: { role_id: 2 },
  });
}
*/


function getAllAdmins() {
  return regeneratorRuntime.async(function getAllAdmins$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", Roles.findAll({
            attributes: [],
            include: {
              model: Users,
              required: true
            },
            where: {
              role_name: "Admin"
            }
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getAdminByGDO(gdovalue) {
  return regeneratorRuntime.async(function getAdminByGDO$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(gdovalue);
          return _context4.abrupt("return", Roles.findAll({
            attributes: [],
            include: {
              model: Users,
              where: {
                gdo_id: gdovalue
              },
              required: true
            },
            where: {
              role_name: "Admin"
            }
          }));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getAllEmployeesByGDO(gdovalue) {
  return regeneratorRuntime.async(function getAllEmployeesByGDO$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", Roles.findAll({
            attributes: [],
            include: {
              model: Users,
              where: {
                gdo_id: gdovalue
              },
              required: true
            },
            where: {
              role_name: "Employee"
            }
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

module.exports = {
  createUser: createUser,
  getAllEmployeesByGDO: getAllEmployeesByGDO,
  getAllAdmins: getAllAdmins,
  getAdminByGDO: getAdminByGDO,
  getUserDetails: getUserDetails
};