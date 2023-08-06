const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { User } = require('../models');


const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.status(401).send({ message: "Unauthorized!" });
}

const isAuthenticated = async (req, res, next) => {
  let bearer_token = req.headers['authorization'] ;

  if (!bearer_token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  const token = bearer_token.split(' ')[1];

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    try {
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      req.userId = user.id;
      req.role = user.userType;
      next();
    } catch (err) {
      return res.status(404).send({ message: "Error Finding User." });
    }
  });
};

const isAdmin = async (req, res, next) => {
  const role = req.role ;

  if (role === 'Admin') {
    return next();
  }
  return res.status(403).send({ message: "Require Admin Role!" });
}

module.exports = {
  isAuthenticated,
  isAdmin 
};