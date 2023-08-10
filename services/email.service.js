const passwordGenerator =  require('generate-password');

const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const env = require('dotenv').config().parsed;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function createVerificationToken() {
  // generate only numbers
  const verificationCode = passwordGenerator.generate({
    length: 6,
    numbers: true,
    symbols: false,
    uppercase: false,
    lowercase: false,
  });
  console.log(verificationCode);
  const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);

  return { verificationCode, hashedVerificationCode };
}

async function sendVerificationEmail(email, verificationCode) {
  const mailOptions = {
    from: env.EMAIL,
    to: email,
    subject: 'Account Verification Token',
    text: `Hello, this is your verification code ${verificationCode}`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  createVerificationToken,
  sendVerificationEmail
};
