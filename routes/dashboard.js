const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController.js');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Operations for dashboard statistics
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     tags: [Dashboard]
 *     description: Get dashboard statistics
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/components/schemas/DashboardStats'
 *       500:
 *         description: Server error
 */
router.get('/', dashboardController.getDashboardStats);

module.exports = router;
