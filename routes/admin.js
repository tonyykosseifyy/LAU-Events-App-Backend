const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

/**
 * @swagger
 * /admins:
 *   get:
 *     tags:
 *       - Admins
 *     description: Get all admins
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of admins
 */
router.get('/', adminController.getAll);

/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     tags:
 *       - Admins
 *     description: Get a single admin by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Admin's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single admin
 */
router.get('/:id', adminController.getOne);

/**
 * @swagger
 * /admins:
 *   post:
 *     tags:
 *       - Admins
 *     description: Create a new admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: admin
 *         description: Admin object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', adminController.create);

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     tags:
 *       - Admins
 *     description: Update an existing admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Admin's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: admin
 *         description: Admin object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:id', adminController.update);

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     tags:
 *       - Admins
 *     description: Delete an admin by its id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Admin's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:id', adminController.deleteOne);

module.exports = router;
