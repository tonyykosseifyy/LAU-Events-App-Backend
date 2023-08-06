const authService = require("../services/auth.service");
const emailService = require("../services/email.service");
const respond = require("../utils/respond");
const userController = require("./userController");
const { User } = require("../models");
const { RefreshToken }  = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

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

  const { accessToken, refreshToken } = await authService.createToken(user, user.userType);

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
  let refreshToken = await RefreshToken.findOne({ 
    where: { token: requestToken }, 
    // include: User
  });
  
  if (!refreshToken) {
    respond(res, 403, { message: "Refresh token is not in database!" });
    return;
  }

  const user = await refreshToken.getUser();

  if (RefreshToken.verifyExpiration(refreshToken)) {
    RefreshToken.destroy({ where: { id: refreshToken.id } });
    respond(res, 403, { message: "Refresh token was expired. Please make a new signin request" });
    return;
  }
  
  const user_id = user.id;
  const user_role = user.userType;

  const newAccessToken = jwt.sign({ id: user_id, role: user_role }, config.secret, { expiresIn: config.jwtExpiration });

  return respond(res, 200, { accessToken: newAccessToken, refreshToken: refreshToken.token });
};

exports.signout = async (req, res) => {
  const id = req.userId;
  try {
    await RefreshToken.destroy({ where: { id } });
    respond(res, 200, { message: "User was logged out!" });
  } catch(err) {
    respond(res, 500, { message: err.message });
  }
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const { verificationToken, hashedVerificationToken } = await emailService.createVerificationToken();

  const hashedPassword = await authService.hashPassword(password);
  // remove req.body and username
  const newBody = {
    ...req.body,
    password: hashedPassword,
    userType: 'User',
    isVerified: false,
    verificationToken: verificationToken
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
  if (!user.verificationToken){
    return respond(res, 400, {message: "User already verified"});
  }
  const isValid = authService.verifyToken(decodedToken, user.verificationToken); 
  
  if (!isValid) {
    return respond(res, 400, {message: "Invalid token"});
  }

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  return respond(res, 200, {message: "The account has been verified."});
};

exports.confirmationAdmin = async (req, res) => {
  const accessToken = req.headers['authorization'].split(' ')[1];

  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (err) {
      // will never fire, cause checked in authJwt
      return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }
    User.findOne({ where: { id: decoded.id } }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      return res.status(200).send({
        isAdmin: user.userType === 'Admin'
      })
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
  })
}