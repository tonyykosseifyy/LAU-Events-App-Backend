const authService = require("../services/auth.service");
const emailService = require("../services/email.service");
const respond = require("../utils/respond");
const userController = require("./userController");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { codeSchema, loginSchema, refreshTokenSchema } = require("../validations/auth");



exports.signin = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = value;

  const user = await User.findOne({
    where: {
      email: email,
    }
  });
  
  if (!user) {
    return res.status(404).send({ message: "User Not found. please Sign up instead" });
  }

  if (!user.isVerified) {
    return res.status(404).send({ message: "User Not Verified Yet. Please Verify Your account first" });
  }
  
  const passwordIsValid = await authService.verifyPassword(password, user.password);

  
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }
  
  const { accessToken, refreshToken } = await authService.createToken(user, user.userType);

  // save refresh token in user database
  user.refreshToken = refreshToken; 
  await user.save();

  res.status(200).send({
    id: user.id,
    email: user.email,
    accessToken: accessToken,
    refreshToken: refreshToken,
    createdAt: user.createdAt,
    major: user.major,
  });
};

exports.refreshToken = async (req, res) => {
  const { error, value } = refreshTokenSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  const { refreshToken: requestToken } = value;

  // validate refresh token and generate new access token
  jwt.verify(requestToken, config.refresh.secret, (err, decoded) => {
    if (err) {
      return respond(res, 403, { message: "Unauthorized! Refresh Token was expired!" })
    }
    User.findOne({ 
      where: { 
        id: decoded.id,
        refreshToken: requestToken, 
      } 
    })
    .then((user) => {
      if ( user ) {
        const role = user.userType ;
        const newAccessToken = jwt.sign({ id: user.id, role }, config.jwt.secret, { expiresIn: config.jwt.expiration });
        return respond(res, 200, { accessToken: newAccessToken });
      }
      return res.status(404).send({ message: "User Not found." });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message })  ;
    });    
  });
};

exports.signout = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findOne({ where: { id } });
    user.refreshToken = null;
    await user.save();

    respond(res, 200, { message: "User was logged out!" });
  } catch(err) {
    respond(res, 500, { message: err.message });
  }
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const old_user = await User.findOne({
    where: {
      email: email,
    }
  });
  if (old_user && old_user.isVerified) {
    return respond(res, 400, { message: "Failed! Email is already in use!" });
  }
  if (old_user && !old_user.isVerified) {
    await old_user.destroy();
  }

  const { verificationCode, hashedVerificationCode } = await emailService.createVerificationToken();

  const hashedPassword = await authService.hashPassword(password);
  const newBody = {
    ...req.body,
    password: hashedPassword,
    userType: 'User',
    isVerified: false,
    verificationToken: hashedVerificationCode,
  };

  const user = await User.create(newBody);

  respond(res, 201, { message: `A verification email has been sent to ${email}. Please check your email. If you can't find a verification code, you can request to resend a new one.`, userId: user.id });

  emailService.sendVerificationEmail(email, verificationCode).catch(err => {
    console.error(`Failed to send verification email to ${email}: ${err.message}`);
  });
};


exports.confirmationPost = async (req, res) => {
  const { error, value } = codeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { userId, code } = value;
  
  const user = await User.findByPk(userId);
  
  
  if (!user) {
    return respond(res, 400, { message: "We were unable to find a user for this verification. Please SignUp!" });
  } else if (user.isVerified) {
    return respond(res, 400, { message: "User already verified" });
  }
  if (!user.verificationToken){
    return respond(res, 400, {message: "User already verified"});
  }
  const isValid = authService.verifyPassword(code, user.verificationToken); 
  
  if (!isValid) {
    return respond(res, 400, {message: "Invalid token"});
  }
  // set user as verified 
  user.isVerified = true;
  user.verificationToken = null;
  
  // store refresh token in user database
  const { accessToken, refreshToken } = await authService.createToken(user, user.userType);
  user.refreshToken = refreshToken;

  await user.save();

  return res.status(200).send({
    id: user.id,
    email: user.email,
    accessToken: accessToken,
    refreshToken: refreshToken,
    createdAt: user.createdAt,
    major: user.major 
  });
};

exports.confirmationAdmin = async (req, res) => {
  const accessToken = req.headers['authorization'].split(' ')[1];

  jwt.verify(accessToken, config.jwt.secret, (err, decoded) => {
    if (err) {
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