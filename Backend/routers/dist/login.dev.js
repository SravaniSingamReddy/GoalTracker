"use strict";

var express = require("express");

var router = express.Router();

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

var jwt = require("jsonwebtoken");

var Users = require("../models").users;

var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult;

var bcrypt = require("bcrypt");

var validate = [body("email").notEmpty().withMessage("Email should not be empty"), body("password").notEmpty().withMessage("Password should not be empty")];
router.post("/", jsonParser, validate, function _callee(req, res) {
  var password, email, errors, userDetails, givenUserPassword, checkPassword, payload, token;
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

          if (!userDetails) {
            res.status(404).json({
              erroremail: "Email id is incorrect"
            });
          } else {
            givenUserPassword = userDetails.password;
            checkPassword = bcrypt.compareSync(password, givenUserPassword);

            if (userDetails.email === email && checkPassword) {
              payload = {
                email: userDetails.email,
                password: userDetails.password
              };
              token = jwt.sign(payload, "secret123");
              res.json({
                jwt: token,
                userDetails: userDetails
              });
            } else {
              res.status(401).json({
                errorpassword: "Password is incorrect"
              });
            }
          }

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;