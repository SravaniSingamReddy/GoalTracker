const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const Users = require("../models").users;
const { body, validationResult } = require("express-validator");

const validate = [
  body("email").notEmpty().withMessage("Email should not be empty"),
  body("password").notEmpty().withMessage("Password should not be empty"),
];
router.post("/", jsonParser, validate, async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const userDetails = await Users.findOne({ where: { email } });
    if(!userDetails){
      res.status(400).json({ error: "Email id is incorrect" });    
    }else{   
      if(userDetails.email===email&&userDetails.password===password){
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
        res.json({ jwt: token ,userDetails:userDetails});
      
      }
    else  {
      res.status(400).json({ error: "Password is incorrect" });
    }
  }
}
});

module.exports = router;
