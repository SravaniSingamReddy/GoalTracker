const Users = require("../models").users
async function createUser({ name,age,email,password,mobile,skills,gdo,role}) {
  console.log("============================");
  console.log(name,age,email,password,mobile,skills,gdo,role);
  console.log("============================");  
  return Users.create({
    name,age,email,password,mobile,skills,gdo,role
  });
}
async function getAllUsers(){
  return Users.findAll();
}
async function getAllUsersByGDO(gdovalue){
  return Users.findAll({
    where: { gdo: gdovalue },
  });
}
async function getAllEmployeesByGDO(gdovalue){
  return Users.findAll({
    where: { gdo: gdovalue ,role:['Employee']},
  });
}

async function getAllAdmins(){
  return Users.findAll({
    where: {role:'Admin'},
  });
}


async function getSuperAdmin(){
  return Users.findAll({
    where: {role:'Super Admin'},
  });
}

module.exports = {  createUser,getAllUsers,getAllUsersByGDO,getAllEmployeesByGDO,getAllAdmins,getSuperAdmin};
