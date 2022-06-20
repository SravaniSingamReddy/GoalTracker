"use strict";

var express = require("express");

var router = express.Router();

var UsersDao = require("../dao/user");

var jwtUtil = require("../verifyToken/verify");

router.use(jwtUtil.checkToken);
router.get("/", function _callee(req, res) {
  var user_id, users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user_id = req.payload.id;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(UsersDao.getUserDetails(user_id));

        case 4:
          users = _context.sent;
          res.json(users);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.json({
            error: _context.t0.toString()
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.get("/a/", function _callee2(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("hello");
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(UsersDao.getAllAdminsbyrole());

        case 4:
          users = _context2.sent;
          res.json(users);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.json({
            error: _context2.t0.toString()
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.get("/admins", function _callee3(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(req.payload.role === "Super Admin")) {
            _context3.next = 13;
            break;
          }

          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(UsersDao.getAllAdmins());

        case 4:
          users = _context3.sent;
          res.json(users);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.json({
            error: _context3.t0.toString()
          });

        case 11:
          _context3.next = 14;
          break;

        case 13:
          res.json({
            error: "Only Super admin can view Admin details"
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.get("/admin/:gdo", function _callee4(req, res) {
  var gdo, users;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(req.payload.role === "Super Admin")) {
            _context4.next = 14;
            break;
          }

          gdo = req.params.gdo;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(UsersDao.getAdminByGDO(gdo));

        case 5:
          users = _context4.sent;
          res.json(users);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](2);
          res.json({
            error: _context4.t0.toString()
          });

        case 12:
          _context4.next = 15;
          break;

        case 14:
          res.json({
            error: "Only Super admin can view Admin details"
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
router.get("/superadmin", function _callee5(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!(req.payload.role === "Super Admin")) {
            _context5.next = 13;
            break;
          }

          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(UsersDao.getSuperAdmin());

        case 4:
          users = _context5.sent;
          res.json(users);
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.json({
            error: _context5.t0.toString()
          });

        case 11:
          _context5.next = 14;
          break;

        case 13:
          res.json({
            error: "Only Super Admin can view his details"
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.get("/employee/:gdo", function _callee6(req, res) {
  var gdo, users;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          gdo = req.params.gdo;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(UsersDao.getAllEmployeesByGDO(gdo));

        case 4:
          users = _context6.sent;
          res.json(users);
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          res.json({
            error: _context6.t0.toString()
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;