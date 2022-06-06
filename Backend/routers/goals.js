const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const GoalssDao = require("../dao/goals");
const {body,validationResult}=require("express-validator");
const Goals = require("../models").goals;
const sequelize=require("sequelize");
const jwtUtil = require("../verifyToken/verify");
router.use(jwtUtil.checkToken);
const { Op } = require("sequelize");

const validate=[
    body('goal').notEmpty().withMessage(`Goal can't be empty`),
    body('user_id').notEmpty().withMessage(`User id can't be empty`),    
]
router.get("/", async (req, res) => {
    try {
      const goals = await GoalssDao.getAllGoals();
      res.json(goals);
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  });
  router.get("/:user_id", async (req, res) => {
    console.log(req.params.user_id)    
    try {
      const goals = await GoalssDao.getGoalsByEmployeeId(req.params.user_id);
      res.json(goals);
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  });
  router.get("/userid/:user_id/:month/:year", async (req, res) => {
    console.log(req.params.user_id)    
    const user_id=req.params.user_id;
    const month=req.params.month;
    const year=req.params.year;
    
    try {
      const goals = await GoalssDao.getGoalsByEmployeeIdDate(user_id,month,year);
      res.json(goals);
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  });
  
  router.get("/byDate/:date/:year", async (req, res) => {
    console.log(req.params.date)    
    console.log(req.params.year)        
    const date=req.params.date;
    const year=req.params.year;    
    try {
      const goals = await GoalssDao.getAllGoalsByDate(date,year);
      res.json(goals);
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  });

  router.post("/", jsonParser,validate, async (req, res) => {
    console.log(req.body);
    try {
      const newGoal = await GoalssDao.createGoals(req.body);
      res.json({
        message: `Created a new Goal with goal_id ${newGoal.id}`,
      });
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  });
  
  router.put("/editgoal", jwtUtil.isEmployee,jsonParser, async (req, res) => {
    console.log(req.body);    
    try {
       await GoalssDao.updategoal(req.body);
      res.json({
        message: `Goal has Updated `,
      });
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  });
  router.put("/editstatus", jwtUtil.isEmployee,jsonParser, async (req, res) => {
    console.log(req.body);
    
    try {
       await GoalssDao.updatestatus(req.body);
      res.json({
        message: `Goal has Updated`,
      });
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  });
    
module.exports = router;
