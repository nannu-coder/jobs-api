const unAuthorized = require("../Errors/unAuthorized");
const jwt = require("jsonwebtoken");
// const User = require("../Schemas/userSchema");

const auth = async (req, res, next) => {
  //Check Headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new unAuthorized("Invalid Authorization");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (error) {
    throw new unAuthorized("Invalid Authorization");
  }
};

module.exports = auth;
