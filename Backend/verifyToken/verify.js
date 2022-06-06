const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    if (token) {
      try {
        var decoded = jwt.verify(token, "secret123");
        next();
      } catch (err) {
        res.status(401).send({ error: err.toString() });
      }
    } else {
      res.status(401).send({ error: "Token is Missing" });
    }
  } else {
    res.status(401).send({ error: "Authorization header is Missing" });
  }
}

function isEmployee(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    if (token) {
      try {
        const payload = jwt.verify(token, "secret123");
        if (payload.isEmployee) {
          next();
        } else {
          res
            .status(401)
            .send({
              error: "Only Employee role is allowed to do this operation",
            });
        }
      } catch (err) {
        console.log(err);
        res.status(401).send({ error: err });
      }
    } else {
      res.status(401).send({ error: "Tokem is missing" });
    }
  } else {
    res.status(401).send({ error: "Authorization header missing" });
  }
}
function isAdmin(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];

    if (token) {
      try {
        const payload = jwt.verify(token, "secret123");
        console.log(`payload: ${JSON.stringify(payload)}`);
        if (payload.isAdmin) {
          next();
        } else {
          res
            .status(401)
            .send({ error: "Only Admin role is allowed to do this operation" });
        }
      } catch (err) {
        console.log(err);
        res.status(401).send({ error: err });
      }
    } else {
      res.status(401).send({ error: "Tokem is missing" });
    }
  } else {
    res.status(401).send({ error: "Authorization header missing" });
  }
}
function isSuperAdmin(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    if (token) {
      try {
        const payload = jwt.verify(token, "secret123");
        if (payload.isSuperAdmin) {
          next();
        } else {
          res
            .status(401)
            .send({
              error: "Only Super Admin role is allowed to do this operation",
            });
        }
      } catch (err) {
        console.log(err);
        res.status(401).send({ error: err });
      }
    } else {
      res.status(401).send({ error: "Token is  Missing" });
    }
  } else {
    res.status(401).send({ error: "Authorization header is  Missing" });
  }
}

module.exports = { checkToken, isEmployee, isAdmin, isSuperAdmin };
