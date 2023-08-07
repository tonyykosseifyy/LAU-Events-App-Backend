const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController.js');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard management operations
 */

/**
 * @swagger
 * /dashboard/:
 *  get:
 *    tags: [Dashboard]
 *    summary: Get Dashboard Statistics
 *    description: Retrieve the statistics for the Dashboard
 *    responses:
 *      '200':
 *        description: A successful response, returns the Dashboard Statistics
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                eventCount:
 *                  type: integer
 *                  example: 100
 *                clubCount:
 *                  type: integer
 *                  example: 20
 *                accpetanceRate:
 *                  type: number
 *                  format: float
 *                  example: 70.5
 *                declineRate:
 *                  type: number
 *                  format: float
 *                  example: 29.5
 *      '500':
 *        description: Server error
 */

router.get('/', dashboardController.getDashboardStats);

module.exports = router;
