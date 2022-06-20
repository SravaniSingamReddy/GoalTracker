const express = require("express");
const router = express.Router();
const UsersDao = require("../dao/user");
const jwtUtil = require("../verifyToken/verify");
router.use(jwtUtil.checkToken);

router.get("/", async (req, res) => {
  const user_id=req.payload.id;
  try {
    const users = await UsersDao.getUserDetails(user_id);
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});
router.get("/a/", async (req, res) => {
  console.log("hello")
  try {
    const users = await UsersDao.getAllAdminsbyrole();
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

router.get("/admins",  async (req, res) => {
  if(req.payload.role==="Super Admin"){  
  try {
    const users = await UsersDao.getAllAdmins();
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
}
else{
  res.json({error: "Only Super admin can view Admin details"});
}
});

router.get("/admin/:gdo",  async (req, res) => {
  if(req.payload.role==="Super Admin"){    
  const gdo = req.params.gdo;  
  try {
    const users = await UsersDao.getAdminByGDO(gdo);
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
}
else{
  res.json({error: "Only Super admin can view Admin details"});
}
});

router.get("/superadmin", async (req, res) => {
  if(req.payload.role==="Super Admin"){
  try {
    const users = await UsersDao.getSuperAdmin();
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
}
else{
  res.json({error: "Only Super Admin can view his details"});
}
});

router.get("/employee/:gdo",  async (req, res) => {
  const gdo = req.params.gdo;
  try {
    const users = await UsersDao.getAllEmployeesByGDO(gdo);
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

module.exports = router;
