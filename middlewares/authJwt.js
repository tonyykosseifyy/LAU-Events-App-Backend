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

const isAuthenticated = (req, res, next) => {
  let bearer_token = req.headers['authorization'] ;

  if (!bearer_token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  const token = bearer_token.split(' ')[1];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const userId = req.userId ;

  const user = await User.findByPk(userId);
  const role = user.userType ;

  if (role === 'Admin') {
    return next();
  }
  return res.status(403).send({ message: "Require Admin Role!" });
}

module.exports = {
  isAuthenticated,
  isAdmin 
};