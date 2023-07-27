const authService = require("../services/auth.service");
const emailService = require("../services/email.service");
const respond = require("../utils/respond");
const userController = require("./userController");
const { User } = require("../models");

exports.signin = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    }
  });
  
  if (!user) {
    return this.signup(req, res);
  }

  if (!user.isVerified) {
    await user.destroy();
    return this.signup(req, res);
  }
  
  const passwordIsValid = await authService.verifyPassword(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }
  const { accessToken, refreshToken } = await authService.createToken(user);

  res.status(200).send({
    id: user.id,
    email: user.email,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return respond(res, 403, { message: "Refresh Token is required!" });
  }

  let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

  if (!refreshToken) {
    respond(res, 403, { message: "Refresh token is not in database!" });
    return;
  }

  if (RefreshToken.verifyExpiration(refreshToken)) {
    RefreshToken.destroy({ where: { id: refreshToken.id } });
    respond(res, 403, { message: "Refresh token was expired. Please make a new signin request" });
    return;
  }
  
  const user_id = refreshToken.user_id;
  const newAccessToken = jwt.sign({ id: user_id }, config.secret, { expiresIn: config.jwtExpiration });

  return respond(res, 200, { accessToken: newAccessToken, refreshToken: refreshToken.token });
};

exports.signout = async (req, res) => {
  const user_id = req.userId;
  try {
    await RefreshToken.destroy({ where: { user_id } });
    respond(res, 200, { message: "User was logged out!" });
  } catch(err) {
    respond(res, 500, { message: err.message });
  }
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const { verificationToken, hashedVerificationToken } = await emailService.createVerificationToken();

  const hashedPassword = await authService.hashPassword(password);
  const newBody = {
    ...req.body,
    password: hashedPassword,
    userType: 'User',
    isVerified: false,
    verificationToken: hashedVerificationToken
  };

  const user = await userController.create({ ...req, body: newBody });

  emailService.sendVerificationEmail(email, verificationToken, user.id).then(() => {
    respond(res, 201, { message: `A verification email has been sent to ${email}.` });
  }).catch(err => {
    return respond(res, 500, { message: err.message });
  });
};

exports.confirmationPost = async (req, res) => {
  const decodedToken = decodeURIComponent(req.params.token);
  const user = await userController.findOne({ id: req.params.userId }, res);
  
  if (!user) {
    respond(res, 400, { message: "We were unable to find a user for this verification. Please SignUp!" });
  }
  
  const isValid = authService.verifyPassword(decodedToken, user.verificationToken);
  
  if (!isValid) {
    return respond(res, 400, {message: "Invalid token"});
  } else if (user.isVerified) {
    return respond(res, 400, {message: "User already verified"});
  }

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  return respond(res, 200, {message: "The account has been verified."});
};
