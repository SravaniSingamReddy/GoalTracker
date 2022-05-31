const express=require("express");
const PORT=3000;
const app=express();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const UsersDao = require("./dao/user");
const GoalssDao = require("./dao/goals");
  
app.get("/users", async (req, res) => {
  try {
    const users = await UsersDao.getAllUsers();
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});
app.get("/goals", async (req, res) => {
  try {
    const goals = await GoalssDao.getAllGoals();
    res.json(goals);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

app.get("/admins", async (req, res) => {
  try {
    const users = await UsersDao.getAllAdmins();
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

app.get("/superadmin", async (req, res) => {
  try {
    const users = await UsersDao.getSuperAdmin();
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

app.get("/usersbygdo/:gdo", async (req, res) => {
  console.log(req.params.gdo)
  const gdo=req.params.gdo;
  try {
    const users = await UsersDao.getAllUsersByGDO(gdo);
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});
app.get("/employee/:gdo", async (req, res) => {
  console.log(req.params.gdo)
  const gdo=req.params.gdo;
  try {
    const users = await UsersDao.getAllEmployeesByGDO(gdo);
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

app.post("/users", jsonParser, async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await UsersDao.createUser(req.body);
    res.json({
      message: `Created a new User with User_id ${newUser.id}`,
    });
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

app.post("/goals", jsonParser, async (req, res) => {
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

app.listen(PORT,()=>{
console.log("Westagilelabs portal app is Up now");
});