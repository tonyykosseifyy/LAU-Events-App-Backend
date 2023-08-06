const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuthenticated } = require('../middlewares/authJwt');



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
 *    description: Existing user sign-in
 *    parameters:
 *      - in: body
 *        name: signin input
 *        schema: 
 *          type: object
 *          properties:            
 *            email:
 *              type: string
 *              example: firstName.lastName@lau.edu
 *            password:
 *              type: string
 *              example: 1 uppercase - 1 lowercase - 8 characters minimum - 1 special character
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: A verification email has been sent to firstName.lastName@lau.edu
 *      401:
 *        description: Invalid password
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
 *                  example: Invalid Password                
 *                
 */

router.post('/signin', authController.signin);

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
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVzZXIiLCJpYXQiOjE2OTEzMjgwNzAsImV4cCI6MTY5MTMyODk3MH0.JZoEL176nLKssoe5vfMXhk6BQofTZqKFl5JjwDifCyk
 *                refreshToken:
 *                  type: string
 *                  example: c110f2dc-2a3a-4382-a75c-a703c4ddd30b
 *      '403':
 *        description: forbidden
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Refresh token is not in database!
 */


router.post('/refreshToken', authController.refreshToken);

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
 *                  example: Error message
 */

router.post('/signout',isAuthenticated, authController.signout);

/**
 * @swagger
 * /confirmation/{userId}/{token}:
 *  get:
 *    tags: [Auth]
 *    summary: User confirmation
 *    description: Confirm user's email
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: integer
 *      - in: path
 *        name: token
 *        required: true
 *        schema:
 *          type: string
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
 *                  example: The account has been verified.
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid token or User already verified
 */

router.get('/confirmation/:userId/:token', authController.confirmationPost);

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
 *                  example: true
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
 *                  example: Error message
 */

router.get('/confirmation/admin',isAuthenticated, authController.confirmationAdmin);

router.post('/verify', authController.confirmationPost);


module.exports = router;

