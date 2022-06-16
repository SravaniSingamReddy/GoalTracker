const Users = require("../models").users;
const bcrypt = require('bcrypt');
async function createUser({
  name,
  age,
  email,
  password,
  mobile,
  skills,
  gdo,
  role,
}) {
   password=bcrypt.hashSync(password, 7)
  return Users.create({
    name,
    age,
    email,
    password,
    mobile,
    skills,
    gdo,
    role,
  });
}
async function getAllUsers() {
  return Users.findAll();
}
async function getAllUsersByGDO(gdovalue) {
  return Users.findAll({
    where: { gdo: gdovalue },
  });
}
async function getAllEmployeesByGDO(gdovalue) {
  return Users.findAll({
    where: { gdo: gdovalue, role: ["Employee"] },
  });
}


async function getAdminByGDO(gdovalue) {
  console.log(gdovalue)
  return Users.findAll({
    where: { gdo: gdovalue, role: ["Admin"] },
  });
}
async function getAllAdmins() {
  return Users.findAll({
    where: { role: "Admin" },
  });
}

async function getSuperAdmin() {
  return Users.findAll({
    where: { role: "Super Admin" },
  });
}

module.exports = {
  createUser,
  getAllUsers,
  getAllUsersByGDO,
  getAllEmployeesByGDO,
  getAllAdmins,
  getSuperAdmin,
  getAdminByGDO
};
