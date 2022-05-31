const db = require("../models/index")
async function createUser({ name,age,email,password,gdo,role}) {
  console.log("============================");
  console.log(name,age,email,password,gdo,role);
  console.log("============================");  
  return db.users.create({
    name,age,email,password,gdo,role
  });
}
async function getAllUsers(){
  return db.users.findAll();
}
async function getAllUsersByGDO(gdovalue){
  return db.users.findAll({
    where: { gdo: gdovalue },
  });
}
async function getAllEmployeesByGDO(gdovalue){
  return db.users.findAll({
    where: { gdo: gdovalue ,role:['Employee']},
  });
}

async function getAllAdmins(){
  return db.users.findAll({
    where: {role:'Admin'},
  });
}

async function getSuperAdmin(){
  return db.users.findAll({
    where: {role:'superadmin'},
  });
}

module.exports = {  createUser,getAllUsers,getAllUsersByGDO,getAllEmployeesByGDO,getAllAdmins,getSuperAdmin};
