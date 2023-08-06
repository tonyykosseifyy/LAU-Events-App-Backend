const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshToken.js');

/**
 * @swagger
 * /api/refreshTokens:
 *   get:
 *     summary: Retrieve a list of refresh tokens
 *     tags: [RefreshToken]
 *     responses:
 *       200:
 *         description: A list of refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RefreshToken'
 */

router.get('/', refreshTokenController.getAll);


module.exports = router;