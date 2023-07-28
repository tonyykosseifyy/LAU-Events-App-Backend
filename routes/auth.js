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
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
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
 */
router.post('/refreshToken', authController.refreshToken);

/**
 * @swagger
 * /signout:
 *  post:
 *    tags: [Auth]
 *    summary: User Sign-out
 *    description: Existing user sign-out
 *    responses:
 *      '200':
 *        description: A successful response
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
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/confirmation/:userId/:token', authController.confirmationPost);

/**
 * @swagger
 * /confirmation/admin:
 *  get:
 *    tags: [Auth]
 *    summary: Admin Confirmation
 *    description: Confirm admin status
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/confirmation/admin',isAuthenticated, authController.confirmationAdmin);

module.exports = router;
