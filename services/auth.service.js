const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { RefreshToken } = require("../models");

async function createToken(user, role) {
  const token = jwt.sign({ id: user.id, role }, config.secret, {
    expiresIn: config.jwtExpiration
  });

  let refreshToken = await RefreshToken.createToken(user);

  return { accessToken: token, refreshToken: refreshToken };
}

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    
    return isValid;
}

module.exports = {
  createToken,
  hashPassword,
  verifyPassword
};
