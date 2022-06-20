"use strict";

var jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  var authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    var token = authorizationHeader.split(" ")[1];

    if (token) {
      try {
        //let payload
        req.payload = jwt.verify(token, "secret123"); //console.log(payload)        

        next();
      } catch (err) {
        res.status(401).send({
          error: err.toString()
        });
      }
    } else {
      res.status(401).send({
        error: "Token is Missing"
      });
    }
  } else {
    res.status(401).send({
      error: "Authorization header is Missing"
    });
  }
}

function isEmployee(req, res, next) {
  var authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    var token = authorizationHeader.split(" ")[1];

    if (token) {
      try {
        var payload = jwt.verify(token, "secret123");

        if (payload.isEmployee) {
          next();
        } else {
          res.status(401).send({
            error: "Only Employee role is allowed to do this operation"
          });
        }
      } catch (err) {
        console.log(err);
        res.status(401).send({
          error: err
        });
      }
    } else {
      res.status(401).send({
        error: "Tokem is missing"
      });
    }
  } else {
    res.status(401).send({
      error: "Authorization header missing"
    });
  }
}

function isAdmin(req, res, next) {
  var authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    var token = authorizationHeader.split(" ")[1];

    if (token) {
      try {
        var payload = jwt.verify(token, "secret123");
        console.log("payload: ".concat(JSON.stringify(payload)));

        if (payload.isAdmin) {
          next();
        } else {
          res.status(401).send({
            error: "Only Admin role is allowed to do this operation"
          });
        }
      } catch (err) {
        console.log(err);
        res.status(401).send({
          error: err
        });
      }
    } else {
      res.status(401).send({
        error: "Tokem is missing"
      });
    }
  } else {
    res.status(401).send({
      error: "Authorization header missing"
    });
  }
}

function isSuperAdmin(req, res, next) {
  var authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    var token = authorizationHeader.split(" ")[1];

    if (token) {
      try {
        var payload = jwt.verify(token, "secret123");

        if (payload.isSuperAdmin) {
          next();
        } else {
          res.status(401).send({
            error: "Only Super Admin role is allowed to do this operation"
          });
        }
      } catch (err) {
        console.log(err);
        res.status(401).send({
          error: err
        });
      }
    } else {
      res.status(401).send({
        error: "Token is  Missing"
      });
    }
  } else {
    res.status(401).send({
      error: "Authorization header is  Missing"
    });
  }
}

module.exports = {
  checkToken: checkToken,
  isEmployee: isEmployee,
  isAdmin: isAdmin,
  isSuperAdmin: isSuperAdmin
};