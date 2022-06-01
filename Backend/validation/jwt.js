const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  console.log(`Inside jwtUtil.checkToken check `);
  const authHeader = req.headers.authorization;
  console.log(`authHeader: ${authHeader}`);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(`token: ${token}`);

    try {
      const payload = jwt.verify(token, "secret123");
      console.log(`payload: ${JSON.stringify(payload)}`);
      next();
    } catch (err) {
      res.status(401).send({ error: err.toString() });
    }
  } else {
    console.log("Authorization header missing");
    res.status(401).send({ error: "Authorization header missing" });
  }
}

function isEmployee(req, res, next) {
  console.log(`Inside jwtUtil.isAdmin check `);
  const authHeader = req.headers.authorization;
  console.log(`authHeader: ${authHeader}`);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(`token: ${token}`);

    try {
      const payload = jwt.verify(token,"secret123");
      console.log(`payload: ${JSON.stringify(payload)}`);
      if (payload.isEmployee) {
        next();
      } else {
        res
          .status(401)
          .send({ error: "Only Employee role is allowed to do this operation" });
      }
    } catch (err) {
      console.log(err);
      res.status(401).send({ error: err });
    }
  } else {
    console.log("Authorization header missing");
    res.status(401).send({ error: "Authorization header missing" });
  }
}
function isAdmin(req, res, next) {
  console.log(`Inside jwtUtil.isAject check `);
  const authHeader = req.headers.authorization;
  console.log(`authHeader: ${authHeader}`);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(`token: ${token}`);

    try {
      const payload = jwt.verify(token,"secret123");
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
    console.log("Authorization header missing");
    res.status(401).send({ error: "Authorization header missing" });
  }
}
function isSuperAdmin(req, res, next) {
  console.log(`Inside jwtUtil.isAject check `);
  const authHeader = req.headers.authorization;
  console.log(`authHeader: ${authHeader}`);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(`token: ${token}`);

    try {
      const payload = jwt.verify(token,"secret123");
      console.log(`payload: ${JSON.stringify(payload)}`);
      if (payload.isSuperAdmin) {
        next();
      } else {
        res
          .status(401)
          .send({ error: "Only Super Admin role is allowed to do this operation" });
      }
    } catch (err) {
      console.log(err);
      res.status(401).send({ error: err });
    }
  } else {
    console.log("Authorization header missing");
    res.status(401).send({ error: "Authorization header missing" });
  }
}

module.exports = { checkToken, isEmployee,isAdmin ,isSuperAdmin};
