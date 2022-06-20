"use strict";

var express = require("express");

var router = express.Router();

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

var jwt = require("jsonwebtoken");

var Users = require("../models").users;

var Roles = require("../models").roles;

var Gdos = require("../models").gdos;

var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult;

var bcrypt = require("bcrypt");

var validate = [body("email").notEmpty().withMessage("Email should not be empty"), body("password").notEmpty().withMessage("Password should not be empty")];
router.post("/", jsonParser, validate, function _callee(req, res) {
  var password, email, errors, userDetails, givenUserPassword, checkPassword, id, role, gdo, payload, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          password = req.body.password;
          email = req.body.email;
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(Users.findOne({
            where: {
              email: email
            }
          }));

        case 9:
          userDetails = _context.sent;

          if (userDetails) {
            _context.next = 14;
            break;
          }

          res.status(404).json({
            erroremail: "Email id is incorrect"
          });
          _context.next = 31;
          break;

        case 14:
          givenUserPassword = userDetails.password;
          checkPassword = bcrypt.compareSync(password, givenUserPassword);

          if (!(userDetails.email === email && checkPassword)) {
            _context.next = 30;
            break;
          }

          id = userDetails.role_id;
          _context.next = 20;
          return regeneratorRuntime.awrap(Roles.findOne({
            where: {
              id: id
            }
          }));

        case 20:
          role = _context.sent;
          _context.next = 23;
          return regeneratorRuntime.awrap(Gdos.findOne({
            where: {
              id: userDetails.gdo_id
            }
          }));

        case 23:
          gdo = _context.sent;
          payload = {
            email: userDetails.email,
            id: userDetails.id,
            role: role.role_name,
            gdo: gdo.gdo_name,
            gdo_id: gdo.id
          };
          console.log(payload);
          token = jwt.sign(payload, "secret123");
          res.json({
            jwt: token,
            userDetails: userDetails,
            role: role.role_name
          });
          _context.next = 31;
          break;

        case 30:
          res.status(401).json({
            errorpassword: "Password is incorrect"
          });

        case 31:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;