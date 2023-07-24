const db = require("../models");
const config = require("../config/auth.config");

const { refreshToken: RefreshToken, User } = db;

const { loginSchema, signupSchema, refreshTokenSchema } = require('../validations/auth');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signin = async (req, res) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({
    where: {
      email: req.body.email,
    }
  })
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: config.jwtExpiration
  });

  let refreshToken = await RefreshToken.createToken(user);

  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    accessToken: token,
    refreshToken: refreshToken,
  });
};

exports.refreshToken = async (req, res) => {
  const { error } = refreshTokenSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }
    const user_id = refreshToken.user_id;

    let newAccessToken = jwt.sign({ id: user_id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.signout = async (req, res) => {
  const user_id = req.userId;
  try {
    await RefreshToken.destroy({ where: { user_id } });
    res.status(200).send({ message: "User was logged out!" });
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
}