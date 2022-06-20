const Users = require("../models").users;
const Roles = require("../models").roles;
const bcrypt = require('bcrypt');

Roles.belongsTo(Users,{targetKey:"role_id",foreignKey:"id"});

//Gdo.belongsTo(Users,{targetKey:"gdoid",foreignKey:"id"});

async function createUser({name,age,email,password,mobile,skills,gdo_id,role_id}) {
   password=bcrypt.hashSync(password, 7)
  return Users.create({name,age,email,password,mobile,skills,gdo_id,role_id});
}
async function getUserDetails(user_id) {
  console.log("==========")
  console.log(user_id)
  return Users.findAll({where:{id:user_id}});
}

/*async function getAllAdmins() {
  return Users.findAll({    
    where: { role_id: 2 },
  });
}
*/
async function getAllAdmins() {
  return Roles.findAll({    
    attributes:[],
    include:{
      model:Users,
      required:true
    },
    where: { role_name: "Admin" },
  });
}

async function getAdminByGDO(gdovalue) {
  console.log(gdovalue)
  return Roles.findAll({
    attributes:[],
    include:{
      model:Users,
      where: { gdo_id: gdovalue},  
      required:true
    },
    where: {role_name: "Admin" },
  });
}
async function getAllEmployeesByGDO(gdovalue) {
  return Roles.findAll({
    attributes:[],
    include:{
      model:Users,
      where: { gdo_id: gdovalue},  
      required:true
    },
    where: {role_name: "Employee" },       
  });
}

module.exports = {
  createUser,
  getAllEmployeesByGDO,
  getAllAdmins,
  getAdminByGDO,
  getUserDetails
};
