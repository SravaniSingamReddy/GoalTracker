const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const Users = require("../models").users;
const Roles = require("../models").roles;
const Gdos = require("../models").gdos;
const { body, validationResult } = require("express-validator");
const bcrypt=require("bcrypt");

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
    if (!userDetails) {
      res.status(404).json({ erroremail: "Email id is incorrect" });
    } else {
      let givenUserPassword=userDetails.password;
    const checkPassword=bcrypt.compareSync(password,givenUserPassword);    
      if (userDetails.email === email && checkPassword) {
        const id = userDetails.role_id;  
        const role= await Roles.findOne({where:{id}})
        const gdo= await Gdos.findOne({where:{id:userDetails.gdo_id}})        
        const payload = {email:userDetails.email,id:userDetails.id,role:role.role_name,gdo:gdo.gdo_name,gdo_id:gdo.id};
        console.log(payload)      
        const token = jwt.sign(payload, "secret123");
        res.json({ jwt: token, userDetails: userDetails,role:role.role_name});
      } else {
        res.status(401).json({ errorpassword: "Password is incorrect" });
      }
    }
  }
});

module.exports = router;
