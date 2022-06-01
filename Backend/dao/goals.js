const Goals = require("../models").goals;
async function createGoals({ goal,user_id,status,date}) {
  console.log("============================");
  console.log(goal,user_id,status,date);
  console.log("============================");  
  return Goals.create({
    goal,user_id,status,date
  });
}
async function getAllGoals(){
  return Goals.findAll();
}
async function updategoal({id,goal}){
  console.log("============================")
  console.log(goal,id)
  return Goals.update({ goal: goal}, {
    where: {
        id:id
    }
  });
}
async function updatestatus({id,status}){
  console.log("============================")
  console.log(id,status)
  return Goals.update({ status: status}, {
    where: {
        id:id
    }
  });
}
async function getGoalsByEmployeeId(user_id){
  console.log("============================")
  console.log(user_id)
  return Goals.findAll({ where: {user_id} });
  
}

module.exports = {  createGoals,getAllGoals,updategoal,updatestatus,getGoalsByEmployeeId};

