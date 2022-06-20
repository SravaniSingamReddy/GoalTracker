const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const GoalssDao = require("../dao/goals");
const Goals = require("../models").goals;
const Users = require("../models").users;
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
  console.log(req.payload.id)  
  const user_id=req.payload.id  
  try {
    const goals = await GoalssDao.getGoalsByEmployeeId(user_id);
    res.json(goals);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});
router.get("/:month_year", async (req, res) => {
  const month_year = req.params.month_year;
  const year = month_year.slice(0, 4);  
  const month = month_year.slice(5);
  console.log(req.payload.id)  
  const user_id=req.payload.id
  try {
    const goals = await GoalssDao.getGoalsByEmployeeIdDate(user_id,month,year);
    res.json(goals);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

router.get("/userid/:user_id/:month_year", async (req, res) => {
  let showgoals=false;
  const user_id=req.params.user_id;  
  console.log(req.payload.role)
  if(req.payload.id===user_id){
    console.log("User id is equal to log in id")
    showgoals=true
  }
  else if(req.payload.role==="Super Admin"){
    console.log("Super Admin can view all user details")    
    showgoals=true
  }
  else if(req.payload.role==="Admin"){
    console.log("Admin can view Employess Under his Gdo") 
    console.log(req.payload.gdo_id)
    const result=await Users.findOne({ where: { id:user_id ,gdo_id:req.payload.gdo_id} });
  if(result){
    showgoals=true
  }  
  }  
  if(showgoals){
  const month_year = req.params.month_year;
  const year = month_year.slice(0, 4);  
  const month = month_year.slice(5);
  try {
    const goals = await GoalssDao.getGoalsByEmployeeIdDate(user_id,month,year);
    res.json(goals);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
  }
  else{
    res.json({
      error: "you doesn't have permission to  view other user goals",
    });
  }
});

router.post("/", jsonParser, validate, async (req, res) => {  
  console.log(req.payload.id)  
  const user_id= req.payload.id
  const goal=req.body.goal;
  const status=req.body.status;
  const date=req.body.date;  
  try {
    const newGoal = await GoalssDao.createGoals(goal,user_id,status,date);
    res.json({
      message: `Created a new Goal with goal_id ${newGoal.id}`,
    });
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
}
);

router.put("/editgoal", jsonParser, async (req, res) => {
  console.log(req.payload.id)  
  const id= req.body.id     
  const goalDetails = await Goals.findOne({ where: { id } });
  console.log(JSON.stringify(goalDetails))
  if(req.payload.id===goalDetails.user_id){    
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
  }
  else{
    res.json({
      error:"You can't edit other user goal",
    });
  }
    
});
router.put("/updatestatus", jsonParser, async (req, res) => {
  console.log(req.payload.id)  
  const id= req.body.id     
  const goalDetails = await Goals.findOne({ where: { id } });
  console.log(JSON.stringify(goalDetails))
  if(req.payload.id===goalDetails.user_id){      
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
}
else{
  res.json({
    error: "You can't update status of other user goal",
  });
}

});
router.delete("/", jsonParser, async (req, res) => {
  console.log(req.payload.id)  
  const id= req.body.id     
  const goalDetails = await Goals.findOne({ where: { id } });
  console.log(JSON.stringify(goalDetails))
  if(req.payload.id===goalDetails.user_id){      
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
}
else{
  res.json({
    error: "You can't delete other user goal",
  });
}

});

module.exports = router;
