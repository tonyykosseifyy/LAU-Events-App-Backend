const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshToken.js');

/**
 * @swagger
 * tags:
 *   name: RefreshToken
 *   description: Refresh token management operations
 */

/**
 * @swagger
 * /refreshToken/:
 *  get:
 *    tags: [RefreshToken]
 *    summary: Get all refresh tokens
 *    description: Retrieve all refresh tokens
 *    responses:
 *      '200':
 *        description: A successful response, returns an array of refresh tokens
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  token:
 *                    type: string
 *                    example: "b33f"
 *                  expiryDate:
 *                    type: string
 *                    format: date-time
 *                    example: "2023-08-07T10:00:00.000Z"
 *      '500':
 *        description: Server error
 */

router.get('/', refreshTokenController.getAll);

module.exports = router;
