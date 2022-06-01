const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const UsersDao = require("../dao/user");

const jwtUtil = require("../validation/jwt");
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
  
  router.get("/admins",jwtUtil.isSuperAdmin,async (req, res) => {
    try {
      const users = await UsersDao.getAllAdmins();
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
  router.get("/employee/:gdo",jwtUtil.isAdmin, async (req, res) => {
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
  
  router.post("/", jsonParser, async (req, res) => {
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
  
  module.exports = router;
