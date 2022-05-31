const db = require("../models/index")
async function createGoals({ goal,user_id,status,date}) {
  console.log("============================");
  console.log(goal,user_id,status,date);
  console.log("============================");  
  return db.goals.create({
    goal,user_id,status,date
  });
}
async function getAllGoals(){
  return db.goals.findAll();
}
module.exports = {  createGoals,getAllGoals};

