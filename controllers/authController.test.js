const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { signin } = require('../controllers/authController');
const { User } = require("../models");
const authService = require("../services/auth.service");

jest.mock("../models");
jest.mock("../services/auth.service");

const app = express();
app.use(bodyParser.json());
app.post('/signin', signin);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('authController', () => {
  describe('POST /signin', () => {
    it('should sign in a user', async () => {
      const reqBody = { email: 'test@example.com', password: 'test123' };
      const mockUser = { id: 1, email: reqBody.email, password: 'hashedpassword' };

      User.findOne.mockResolvedValue(mockUser);
      authService.verifyPassword.mockResolvedValue(true);
      authService.createToken.mockReturnValue({ accessToken: 'access', refreshToken: 'refresh' });

      const res = await request(app)
        .post('/signin')
        .send(reqBody)
        .expect(200);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: reqBody.email } });
      expect(authService.verifyPassword).toHaveBeenCalledWith(reqBody.password, mockUser.password);
      expect(res.body).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        accessToken: 'access',
        refreshToken: 'refresh',
      });
    });

    // TODO: Add more tests here for other cases, e.g. when the user does not exist,
    // when the password is not valid, etc.
  });

  // TODO: Add similar describe blocks here for your other methods, e.g. refreshToken, signout, etc.
});
