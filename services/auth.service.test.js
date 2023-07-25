const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}));

jest.mock('bcryptjs', () => ({
    hash: jest.fn(), 
    compare: jest.fn()
}));

jest.mock("../models", () => ({
    refreshToken: {
        createToken: jest.fn().mockReturnValue("mocked_refresh_token") 
    }   
}));

const { createToken, hashPassword, verifyPassword } = require('../services/auth.service');

const SECRET = 'MyRandomSecret123!';
const JWT_EXPIRATION = 86400;
const USER_ID = 'user123';
const REFRESH_TOKEN = 'refreshToken123';

jest.mock("../config/auth.config", () => ({
    secret: SECRET,
    jwtExpiration: JWT_EXPIRATION
}));

describe('AuthService', () => {
    it('createToken calls jwt.sign with correct parameters', async () => {
        jwt.sign.mockReturnValueOnce(REFRESH_TOKEN);
        const user = { id: USER_ID };
        
        const result = await createToken(user);

        expect(jwt.sign).toHaveBeenCalledWith({ id: user.id }, SECRET, { expiresIn: JWT_EXPIRATION });
        expect(result).toEqual({ accessToken: REFRESH_TOKEN, refreshToken: 'mocked_refresh_token' });
    });

    it('hashPassword calls bcrypt.hash with correct parameters', async () => {
        const PASSWORD = 'password123';
        const HASHED_PASSWORD = 'hashedPassword123';
        
        bcrypt.hash.mockReturnValueOnce(HASHED_PASSWORD);
        
        const result = await hashPassword(PASSWORD);
        
        expect(bcrypt.hash).toHaveBeenCalledWith(PASSWORD, 10);
        expect(result).toBe(HASHED_PASSWORD);
    });

    it('verifyPassword calls bcrypt.compare with correct parameters', async () => {
        const PASSWORD = 'password123';
        const HASHED_PASSWORD = 'hashedPassword123';
        
        bcrypt.compare.mockReturnValueOnce(true);
        
        const result = await verifyPassword(PASSWORD, HASHED_PASSWORD);
        
        expect(bcrypt.compare).toHaveBeenCalledWith(PASSWORD, HASHED_PASSWORD);
        expect(result).toBe(true);
    });
});
