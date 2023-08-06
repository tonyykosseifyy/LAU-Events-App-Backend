const express = require('express');
const router = express.Router();
const clubEventController = require('../controllers/clubEventController.js');

/**
 * @swagger
 * tags:
 *   name: ClubEvent
 *   description: Operations on club events
 */

/**
 * @swagger
 * /clubevents:
 *   get:
 *     tags: [ClubEvent]
 *     description: Get all club events
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ClubEvent'
 */
router.get('/', clubEventController.getAll);

/**
 * @swagger
 * /clubevents/{id}:
 *   get:
 *     tags: [ClubEvent]
 *     description: Get a club event by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/components/schemas/ClubEvent'
 */
router.get('/:id', clubEventController.getOne);

/**
 * @swagger
 * /clubevents:
 *   post:
 *     tags: [ClubEvent]
 *     description: Create a new club event
 *     parameters:
 *       - name: clubEvent
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ClubEvent'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', clubEventController.create);

/**
 * @swagger
 * /clubevents/{id}:
 *   put:
 *     tags: [ClubEvent]
 *     description: Update a club event by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: clubEvent
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ClubEvent'
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/:id', clubEventController.update);

/**
 * @swagger
 * /clubevents/{id}:
 *   delete:
 *     tags: [ClubEvent]
 *     description: Delete a club event by ID
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
router.delete('/:id', clubEventController.deleteOne);

module.exports = router;