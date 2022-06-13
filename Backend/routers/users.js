const express = require("express");
const router = express.Router();
const UsersDao = require("../dao/user");
const jwtUtil = require("../verifyToken/verify");
router.use(jwtUtil.checkToken);

router.get("/", async (req, res) => {
  try {
    const users = await UsersDao.getAllUsers();
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

router.get("/admins", jwtUtil.isSuperAdmin, async (req, res) => {
  try {
    const users = await UsersDao.getAllAdmins();
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

router.get("/admin/:gdo", jwtUtil.isSuperAdmin, async (req, res) => {
  const gdo = req.params.gdo;  
  try {
    const users = await UsersDao.getAdminByGDO(gdo);
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

router.get("/superadmin", async (req, res) => {
  try {
    const users = await UsersDao.getSuperAdmin();
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

router.get("/usersbygdo/:gdo", async (req, res) => {
  const gdo = req.params.gdo;
  try {
    const users = await UsersDao.getAllUsersByGDO(gdo);
    res.json(users);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});
router.get("/employee/:gdo", jwtUtil.isAdmin, async (req, res) => {
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
