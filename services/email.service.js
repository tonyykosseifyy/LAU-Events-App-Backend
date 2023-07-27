const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const env = require('dotenv').config().parsed;

async function createVerificationToken() {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);

  return { verificationToken, hashedVerificationToken };
}

async function sendVerificationEmail(email, verificationToken, userId) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'tonykosseify123@gmail.com',
      pass: 'ltblnbphxmmagpfo'
    },
    tls: {
      rejectUnauthorized: false
    }
  });


  const encodedVerificationToken = encodeURIComponent(verificationToken);

  const mailOptions = {
    from: env.EMAIL,
    to: email,
    subject: 'Account Verification Token',
    text: `Hello, please verify your account by clicking the link: ${env.CLIENT_URL}/auth/confirmation/${userId}/${encodedVerificationToken}`
  };


  return transporter.sendMail(mailOptions);
}

module.exports = {
  createVerificationToken,
  sendVerificationEmail
};
