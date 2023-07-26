const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

jest.mock('crypto', () => ({
  randomBytes: jest.fn()
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn()
}));

let mockSendMail = jest.fn();

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: mockSendMail,
  })),
}));

const { createVerificationToken, sendVerificationEmail } = require('../services/email.service');

const VERIFICATION_TOKEN = 'verificationToken123';
const HASHED_VERIFICATION_TOKEN = 'hashedVerificationToken123';
const USER_ID = 'userId123';
const EMAIL = 'email@example.com';
const EMAIL_PASSWORD = 'emailPassword123';
const CLIENT_URL = 'http://localhost:3000';

jest.mock('dotenv', () => ({
    config: () => ({ parsed: {
        EMAIL: EMAIL,
        EMAIL_PASS: EMAIL_PASSWORD,
        CLIENT_URL: CLIENT_URL
    }}),
}));

describe('EmailService', () => {
  it('createVerificationToken calls crypto.randomBytes and bcrypt.hash with correct parameters', async () => {
    crypto.randomBytes.mockReturnValueOnce({ toString: () => VERIFICATION_TOKEN });
    bcrypt.hash.mockReturnValueOnce(HASHED_VERIFICATION_TOKEN);

    const result = await createVerificationToken();

    expect(crypto.randomBytes).toHaveBeenCalledWith(32);
    expect(bcrypt.hash).toHaveBeenCalledWith(VERIFICATION_TOKEN, 10);
    expect(result).toEqual({ verificationToken: VERIFICATION_TOKEN, hashedVerificationToken: HASHED_VERIFICATION_TOKEN });
  });

  it('sendVerificationEmail calls nodemailer.createTransport and sendMail with correct parameters', async () => {
    const encodedVerificationToken = encodeURIComponent(VERIFICATION_TOKEN);

    const result = await sendVerificationEmail(EMAIL, VERIFICATION_TOKEN, USER_ID);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: EMAIL,
      to: EMAIL,
      subject: 'Account Verification Token',
      text: `Hello, please verify your account by clicking the link: ${CLIENT_URL}/auth/confirmation/${USER_ID}/${encodedVerificationToken}`
    });
  });
});
