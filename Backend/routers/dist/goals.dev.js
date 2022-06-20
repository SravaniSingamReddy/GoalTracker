"use strict";

var express = require("express");

var router = express.Router();

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

var GoalssDao = require("../dao/goals");

var Goals = require("../models").goals;

var Users = require("../models").users;

var _require = require("express-validator"),
    body = _require.body;

var jwtUtil = require("../verifyToken/verify");

router.use(jwtUtil.checkToken);
var validate = [body("goal").notEmpty().withMessage("Goal should not be empty"), body("user_id").notEmpty().withMessage("User id should not be empty").isNumeric().withMessage("user id must be an integer")];
router.get("/", function _callee(req, res) {
  var user_id, goals;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.payload.id);
          user_id = req.payload.id;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(GoalssDao.getGoalsByEmployeeId(user_id));

        case 5:
          goals = _context.sent;
          res.json(goals);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          res.json({
            error: _context.t0.toString()
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
router.get("/:month_year", function _callee2(req, res) {
  var month_year, year, month, user_id, goals;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          month_year = req.params.month_year;
          year = month_year.slice(0, 4);
          month = month_year.slice(5);
          console.log(req.payload.id);
          user_id = req.payload.id;
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(GoalssDao.getGoalsByEmployeeIdDate(user_id, month, year));

        case 8:
          goals = _context2.sent;
          res.json(goals);
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](5);
          res.json({
            error: _context2.t0.toString()
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 12]]);
});
router.get("/userid/:user_id/:month_year", function _callee3(req, res) {
  var showgoals, user_id, result, month_year, year, month, goals;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          showgoals = false;
          user_id = req.params.user_id;
          console.log(req.payload.role);

          if (!(req.payload.id === user_id)) {
            _context3.next = 8;
            break;
          }

          console.log("User id is equal to log in id");
          showgoals = true;
          _context3.next = 20;
          break;

        case 8:
          if (!(req.payload.role === "Super Admin")) {
            _context3.next = 13;
            break;
          }

          console.log("Super Admin can view all user details");
          showgoals = true;
          _context3.next = 20;
          break;

        case 13:
          if (!(req.payload.role === "Admin")) {
            _context3.next = 20;
            break;
          }

          console.log("Admin can view Employess Under his Gdo");
          console.log(req.payload.gdo_id);
          _context3.next = 18;
          return regeneratorRuntime.awrap(Users.findOne({
            where: {
              id: user_id,
              gdo_id: req.payload.gdo_id
            }
          }));

        case 18:
          result = _context3.sent;

          if (result) {
            showgoals = true;
          }

        case 20:
          if (!showgoals) {
            _context3.next = 36;
            break;
          }

          month_year = req.params.month_year;
          year = month_year.slice(0, 4);
          month = month_year.slice(5);
          _context3.prev = 24;
          _context3.next = 27;
          return regeneratorRuntime.awrap(GoalssDao.getGoalsByEmployeeIdDate(user_id, month, year));

        case 27:
          goals = _context3.sent;
          res.json(goals);
          _context3.next = 34;
          break;

        case 31:
          _context3.prev = 31;
          _context3.t0 = _context3["catch"](24);
          res.json({
            error: _context3.t0.toString()
          });

        case 34:
          _context3.next = 37;
          break;

        case 36:
          res.json({
            error: "you doesn't have permission to  view other user goals"
          });

        case 37:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[24, 31]]);
});
router.post("/", jsonParser, validate, function _callee4(req, res) {
  var user_id, goal, status, date, newGoal;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(req.payload.id);
          user_id = req.payload.id;
          goal = req.body.goal;
          status = req.body.status;
          date = req.body.date;
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(GoalssDao.createGoals(goal, user_id, status, date));

        case 8:
          newGoal = _context4.sent;
          res.json({
            message: "Created a new Goal with goal_id ".concat(newGoal.id)
          });
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](5);
          res.json({
            error: _context4.t0.toString()
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 12]]);
});
router.put("/editgoal", jsonParser, function _callee5(req, res) {
  var id, goalDetails;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log(req.payload.id);
          id = req.body.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Goals.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          goalDetails = _context5.sent;
          console.log(JSON.stringify(goalDetails));

          if (!(req.payload.id === goalDetails.user_id)) {
            _context5.next = 18;
            break;
          }

          _context5.prev = 7;
          _context5.next = 10;
          return regeneratorRuntime.awrap(GoalssDao.editGoal(req.body));

        case 10:
          res.json({
            message: "Goal has Edited Successfully"
          });
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](7);
          res.json({
            error: _context5.t0.toString()
          });

        case 16:
          _context5.next = 19;
          break;

        case 18:
          res.json({
            error: "You can't edit other user goal"
          });

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[7, 13]]);
});
router.put("/updatestatus", jsonParser, function _callee6(req, res) {
  var id, goalDetails;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log(req.payload.id);
          id = req.body.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Goals.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          goalDetails = _context6.sent;
          console.log(JSON.stringify(goalDetails));

          if (!(req.payload.id === goalDetails.user_id)) {
            _context6.next = 18;
            break;
          }

          _context6.prev = 7;
          _context6.next = 10;
          return regeneratorRuntime.awrap(GoalssDao.updatestatus(req.body));

        case 10:
          res.json({
            message: "Goal has Updated"
          });
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](7);
          res.json({
            error: _context6.t0.toString()
          });

        case 16:
          _context6.next = 19;
          break;

        case 18:
          res.json({
            error: "You can't update status of other user goal"
          });

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[7, 13]]);
});
router["delete"]("/", jsonParser, function _callee7(req, res) {
  var id, goalDetails;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log(req.payload.id);
          id = req.body.id;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Goals.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          goalDetails = _context7.sent;
          console.log(JSON.stringify(goalDetails));

          if (!(req.payload.id === goalDetails.user_id)) {
            _context7.next = 18;
            break;
          }

          _context7.prev = 7;
          _context7.next = 10;
          return regeneratorRuntime.awrap(GoalssDao.deleteGoal(req.body.id));

        case 10:
          res.json({
            message: "goal deleted Successfully"
          });
          _context7.next = 16;
          break;

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](7);
          res.json({
            error: _context7.t0.toString()
          });

        case 16:
          _context7.next = 19;
          break;

        case 18:
          res.json({
            error: "You can't delete other user goal"
          });

        case 19:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[7, 13]]);
});
module.exports = router;