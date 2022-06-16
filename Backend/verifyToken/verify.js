const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;  
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];    
    if (token) {
      try {
        const payload = jwt.verify(token, "secret123");
        console.log(payload)
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

module.exports = { checkToken};
