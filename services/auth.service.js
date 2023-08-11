const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

async function createToken(user, role) {
  const token = jwt.sign({ id: user.id, role }, config.jwt.secret, {
    expiresIn: config.jwt.expiration
  });
  
  const refreshToken = jwt.sign({ id: user.id }, config.refresh.secret, {
    expiresIn: config.refresh.expiration
  })

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
  verifyPassword,
};
