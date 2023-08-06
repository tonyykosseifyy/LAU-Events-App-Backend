const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Operations about events
 */

/**
 * @swagger
 * /event:
 *   get:
 *     tags: [Events]
 *     description: Get all events
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error
 *   post:
 *     tags: [Events]
 *     description: Create new event
 *     parameters:
 *       - in: body
 *         name: event
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *         required: true
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error
 * /event/{id}:
 *   get:
 *     tags: [Events]
 *     description: Get one event by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the event to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 *   put:
 *     tags: [Events]
 *     description: Update event by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the event to update
 *         schema:
 *           type: integer
 *       - in: body
 *         name: event
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 *   delete:
 *     tags: [Events]
 *     description: Delete event by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the event to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 * /event/{id}/details:
 *   get:
 *     tags: [Events]
 *     description: Get event details by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the event to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/components/schemas/EventDetails'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get('/', eventController.getAll);
router.get('/declinedEvents', eventController.getAllDeclinedEvents);

router.get('/:id', eventController.getOne);
router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.deleteOne);
router.delete('/', eventController.deleteAll)
router.get('/:id/details', eventController.getEventDetails);

module.exports = router;
