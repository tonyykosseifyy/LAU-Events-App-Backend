const express = require('express');
const router = express.Router();
const userClubController = require('../controllers/userClubController.js');


/**
 * @swagger
 * tags:
 *   name: UserClubs
 *   description: The userClubs managing API
 *
 * /userClub:
 *   get:
 *     tags: [UserClubs]
 *     summary: Retrieve a list of userClubs
 *     responses:
 *       200:
 *         description: A list of userClubs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserClub'
 * 
 *   post:
 *     tags: [UserClubs]
 *     summary: Create a new userClub
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserClub'
 *     responses:
 *       201:
 *         description: The created userClub
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserClub'
 * 
 * /userClub/{id}:
 *   get:
 *     tags: [UserClubs]
 *     summary: Retrieve a single userClub
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the userClub
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested userClub
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserClub'
 * 
 *   put:
 *     tags: [UserClubs]
 *     summary: Update a userClub
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the userClub to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserClub'
 *     responses:
 *       200:
 *         description: The updated userClub
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserClub'
 * 
 *   delete:
 *     tags: [UserClubs]
 *     summary: Delete a userClub
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the userClub to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted userClub
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserClub'
 */


router.get('/', userClubController.getAll);
router.get('/:id', userClubController.getOne);
router.post('/', userClubController.create);
router.put('/:id', userClubController.update);
router.delete('/:id', userClubController.deleteOne);

module.exports = router;
