const express = require('express');
const router = express.Router();
const userEventsController = require('../controllers/userEventsController.js');

/**
 * @swagger
 * tags:
 *   name: UserEvents
 *   description: The UserEvents managing API
 * 
 * /userEvent:
 *   get:
 *     tags: [UserEvents]
 *     summary: Retrieve a list of UserEvents
 *     responses:
 *       200:
 *         description: A list of UserEvents
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEvent'
 * 
 *   post:
 *     tags: [UserEvents]
 *     summary: Create a new UserEvent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserEvent'
 *     responses:
 *       201:
 *         description: The created UserEvent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEvent'
 * 
 * /userEvent/{id}:
 *   get:
 *     tags: [UserEvents]
 *     summary: Retrieve a single UserEvent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the UserEvent
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested UserEvent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEvent'
 * 
 *   put:
 *     tags: [UserEvents]
 *     summary: Update a UserEvent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the UserEvent to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserEvent'
 *     responses:
 *       200:
 *         description: The updated UserEvent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEvent'
 * 
 *   delete:
 *     tags: [UserEvents]
 *     summary: Delete a UserEvent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the UserEvent to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted UserEvent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEvent'
 */

router.get('/', userEventsController.getAll);
router.get('/:id', userEventsController.getOne);
router.post('/', userEventsController.create);
router.put('/:id', userEventsController.update);
router.delete('/:id', userEventsController.deleteOne);

module.exports = router;
