const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const GoalssDao = require("../dao/goals");

const jwtUtil = require("../validation/jwt");
router.use(jwtUtil.checkToken);

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

  router.post("/", jsonParser, async (req, res) => {
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
