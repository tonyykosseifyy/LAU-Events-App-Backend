const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuthenticated } = require('../middlewares/authJwt');
const validate = require('../middlewares/validate');
const { signinSchema, refreshTokenSchema, verifySchema } = require('../validations/auth.validation');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /signin:
 *  post:
 *    tags: [Auth]
 *    summary: User sign-in
 *    description: Existing user sign-in or new user sign-up
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                example: user@example.com
 *              password:
 *                type: string
 *                example: Password123!
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                email:
 *                  type: string
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  example: null
 *                message:
 *                  type: string
 *                  example: Invalid Password!
 */

router.post('/signin', validate(signinSchema, 'body'), authController.signin);

/**
 * @swagger
 * /refreshToken:
 *  post:
 *    tags: [Auth]
 *    summary: Refresh Access Token
 *    description: Refresh user's access token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - refreshToken
 *            properties:
 *              refreshToken:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      '403':
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

router.post('/refreshToken', validate(refreshTokenSchema, 'body'), authController.refreshToken);

/**
 * @swagger
 * /signout:
 *  post:
 *    tags: [Auth]
 *    summary: User Sign-out
 *    description: Existing user sign-out
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVzZXIiLCJpYXQiOjE2OTEzMjgwNzAsImV4cCI6MTY5MTMyODk3MH0.JZoEL176nLKssoe5vfMXhk6BQofTZqKFl5JjwDifCyk
 *        required: true
 *        description: Bearer token for authentication
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: User was logged out!
 *      '500':
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

router.post('/signout',isAuthenticated, authController.signout);

/**
 * @swagger
 * /confirmation/admin:
 *  get:
 *    tags: [Auth]
 *    summary: Admin Confirmation
 *    description: Confirm admin status
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVzZXIiLCJpYXQiOjE2OTEzMjgwNzAsImV4cCI6MTY5MTMyODk3MH0.JZoEL176nLKssoe5vfMXhk6BQofTZqKFl5JjwDifCyk
 *        required: true
 *        description: Bearer token for authentication
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isAdmin:
 *                  type: boolean
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Unauthorized! Access Token was expired!
 *      '404':
 *        description: User Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: User Not found.
 *      '500':
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

router.get('/confirmation/admin',isAuthenticated, authController.confirmationAdmin);

/**
 * @swagger
 * /verify:
 *  post:
 *    tags: [Auth]
 *    summary: Verify User
 *    description: Verify user's email address
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - code
 *            properties:
 *              userId:
 *                type: integer
 *              code:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                email:
 *                  type: string
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */

router.post('/verify', validate(verifySchema, 'body'), authController.confirmationPost);

module.exports = router;
