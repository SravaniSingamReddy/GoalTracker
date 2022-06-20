"use strict";

var express = require("express");

var router = express.Router();

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

var Users = require("../models").users;

var Roles = require("../models").roles;

var Gdos = require("../models").gdos;

var UsersDao = require("../dao/user");

var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult;

var validate = [body("name").matches(/^[A-Za-z ]+$/).withMessage("Name should contain only Alphabets").notEmpty().withMessage("Name should not be Empty"), body("age").isNumeric().withMessage("Age should be in numbers").notEmpty().withMessage("Age should not be empty"), body("email").notEmpty().withMessage("Email should not be empty").isEmail().withMessage("Enter a valid email id").custom(function _callee(email) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Users.findOne({
            where: {
              email: email
            }
          }).then(function (user) {
            if (user) {
              return Promise.reject("Email is in use");
            }
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}), body("password").isLength({
  min: 7
}).withMessage("Password length should be atleast 7").matches(/[a-z]/).withMessage("Must contain  atleast one lower casecharacter").matches(/[A-Z]/).withMessage("Must contain atleast one upper case character").matches(/\d/).withMessage("Must contain atleast 1 number").matches(/[@$!%*?&]/).withMessage("Must contain atleast one special character").notEmpty().withMessage("Password should not be empty"), body("mobile").isNumeric().withMessage("Mobile Number contain only digits").isLength({
  min: 10,
  max: 10
}).withMessage("Mobile Number should contain exactly 10 digits"), body("role_id").notEmpty().withMessage("Role should not be empty").isNumeric().withMessage("role_id should be in numbers"), body("gdo_id").notEmpty().withMessage("Gdo should not be empty").isNumeric().withMessage("gdo_id should be in numbers"), body("skills").notEmpty().withMessage("skills should not be empty")];
router.post("/", jsonParser, validate, function _callee2(req, res) {
  var errors, role_id, gdo_id, Role, Gdo, register, user, _user, newUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 5:
          _context2.prev = 5;
          role_id = req.body.role_id;
          gdo_id = req.body.gdo_id;
          _context2.next = 10;
          return regeneratorRuntime.awrap(Roles.findOne({
            where: {
              id: role_id
            }
          }));

        case 10:
          Role = _context2.sent;
          _context2.next = 13;
          return regeneratorRuntime.awrap(Gdos.findOne({
            where: {
              id: gdo_id
            }
          }));

        case 13:
          Gdo = _context2.sent;
          console.log(JSON.stringify(Role));
          console.log(JSON.stringify(Gdo));
          register = true;

          if (!(Gdo.gdo_name === "ALL" || Role.role_name === "Super Admin")) {
            _context2.next = 30;
            break;
          }

          if (Role.role_name === "Super Admin") {
            _context2.next = 23;
            break;
          }

          register = false;
          res.json({
            error: "ALL gdos option is for Super Admin only"
          });
          _context2.next = 28;
          break;

        case 23:
          if (!(Role.role_name === "Super Admin")) {
            _context2.next = 28;
            break;
          }

          _context2.next = 26;
          return regeneratorRuntime.awrap(Users.findOne({
            where: {
              role_id: role_id
            }
          }));

        case 26:
          user = _context2.sent;

          if (user) {
            register = false;
            res.json({
              error: "Already Super Admin is there"
            });
          } else if (!(Gdo.gdo_name === "ALL")) {
            register = false;
            res.json({
              error: "For Super Admim gdo is ALL option"
            });
          }

        case 28:
          _context2.next = 35;
          break;

        case 30:
          if (!(Role.role_name === "Admin")) {
            _context2.next = 35;
            break;
          }

          _context2.next = 33;
          return regeneratorRuntime.awrap(Users.findOne({
            where: {
              role_id: role_id,
              gdo_id: gdo_id
            }
          }));

        case 33:
          _user = _context2.sent;

          if (_user) {
            register = false;
            res.json({
              error: "Already Admin is there"
            });
          }

        case 35:
          if (!register) {
            _context2.next = 40;
            break;
          }

          _context2.next = 38;
          return regeneratorRuntime.awrap(UsersDao.createUser(req.body));

        case 38:
          newUser = _context2.sent;
          res.json({
            message: "Created a new User with User_id ".concat(newUser.id)
          });

        case 40:
          _context2.next = 45;
          break;

        case 42:
          _context2.prev = 42;
          _context2.t0 = _context2["catch"](5);
          res.json({
            error: _context2.t0.toString()
          });

        case 45:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 42]]);
});
module.exports = router;