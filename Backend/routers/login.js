const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const Users = require("../models").users;
const { body, validationResult } = require("express-validator");

const validate = [
  body("email").isEmail().withMessage("Enter valid email"),
  body("password").notEmpty().withMessage("Password not be empty"),
];
router.post("/", jsonParser, validate, async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  console.log(password)
  console.log(email)  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const checkEmail = await Users.findOne({ where: { email } });
    if(!checkEmail){
      res.status(400).json({ error: "Email id is incorrect" });    
    }else{    
    const userDetails = await Users.findOne({ where: { email, password } });
    if (!userDetails) {
      res.status(400).json({ error: "Password is incorrect" });
    } else {
      const payload = {};
      console.log(`user details: ${JSON.stringify(userDetails)}`);
      const role = userDetails.role;      
      if (role == "Employee") {
        payload.isEmployee = true;
        payload.isAdmin = false;
        payload.isSuperAdmin = false;
      } else if (role == "Admin") {
        payload.isEmployee = true;
        payload.isAdmin = true;
        payload.isSuperAdmin = false;
      } else if (role == "Super Admin") {
        payload.isEmployee = true;
        payload.isAdmin = true;
        payload.isSuperAdmin = true;
      }
      console.log(`payload: ${JSON.stringify(payload)}`);
      const token = jwt.sign(payload, "secret123");
      res.json({ jwt: token });
    }
  }
}
});

module.exports = router;
