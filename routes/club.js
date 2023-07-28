const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController.js');

/**
 * @swagger
 * tags:
 *   name: Club
 *   description: Operations on club model
 */

/**
 * @swagger
 * /clubs:
 *   get:
 *     tags: [Club]
 *     description: Get all clubs
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', clubController.getAll);

/**
 * @swagger
 * /clubs/{id}:
 *   get:
 *     tags: [Club]
 *     description: Get a club by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', clubController.getOne);

/**
 * @swagger
 * /clubs/{id}/events:
 *   get:
 *     tags: [Club]
 *     description: Get a club with events by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id/events', clubController.getWithEvents);

/**
 * @swagger
 * /clubs:
 *   post:
 *     tags: [Club]
 *     description: Create a new club
 *     parameters:
 *       - name: club
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             clubName:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', clubController.create);

/**
 * @swagger
 * /clubs/{id}:
 *   put:
 *     tags: [Club]
 *     description: Update a club by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: club
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             clubName:
 *               type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put('/:id', clubController.update);

/**
 * @swagger
 * /clubs/{id}:
 *   delete:
 *     tags: [Club]
 *     description: Delete a club by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted successfully
 */
router.delete('/:id', clubController.deleteOne);

module.exports = router;
