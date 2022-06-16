const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const GoalssDao = require("../dao/goals");
const { body } = require("express-validator");
const jwtUtil = require("../verifyToken/verify");
router.use(jwtUtil.checkToken);

const validate = [
  body("goal").notEmpty().withMessage("Goal should not be empty"),
  body("user_id")
    .notEmpty()
    .withMessage("User id should not be empty")
    .isNumeric()
    .withMessage("user id must be an integer"),
];
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
  try {
    const goals = await GoalssDao.getGoalsByEmployeeId(req.params.user_id);
    res.json(goals);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});
router.get("/userid/:user_id/:month_year", async (req, res) => {
  const user_id = req.params.user_id;
  const month_year = req.params.month_year;
  const year = month_year.slice(0, 4);
  const month = month_year.slice(5);
  try {
    const goals = await GoalssDao.getGoalsByEmployeeIdDate(
      user_id,
      month,
      year
    );
    res.json(goals);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

router.get("/byDate/:date/:year", async (req, res) => {
  const date = req.params.date;
  const year = req.params.year;
  try {
    const goals = await GoalssDao.getAllGoalsByDate(date, year);
    res.json(goals);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

router.post("/", jsonParser, validate, async (req, res) => {
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

router.put("/editgoal", jsonParser, async (req, res) => {
  try {
    await GoalssDao.editGoal(req.body);
    res.json({
      message: "Goal has Edited Successfully",
    });
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});
router.put("/updatestatus", jsonParser, async (req, res) => {
  try {
    await GoalssDao.updatestatus(req.body);
    res.json({
      message: "Goal has Updated",
    });
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});
router.delete("/", jsonParser, async (req, res) => {
  try {
    await GoalssDao.deleteGoal(req.body.id);
    res.json({
      message: "goal deleted Successfully",
    });
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

module.exports = router;
