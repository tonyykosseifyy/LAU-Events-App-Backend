const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');



/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Operations on admin model
 */


/**
 * @swagger
 * /admins:
 *   get:
 *     tags: [Admin]
 *     description: Get all admins
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/components/schemas/Admin'
 *       403:
 *         description: Forbidden (not an admin)
 */
router.get('/', adminController.getAll);

/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     tags: [Admin]
 *     description: Get an admin by ID
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
 *           $ref: '#/components/schemas/Admin'
 *       403:
 *         description: Forbidden (not an admin)
 */
router.get('/:id', adminController.getOne);

/**
 * @swagger
 * /admins:
 *   post:
 *     tags: [Admin]
 *     description: Create a new admin
 *     parameters:
 *       - name: admin
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Created
 *       403:
 *         description: Forbidden (not an admin)
 */
router.post('/', adminController.create);

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     tags: [Admin]
 *     description: Update an admin by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: admin
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Forbidden (not an admin)
 */
router.put('/:id', adminController.update);

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     tags: [Admin]
 *     description: Delete an admin by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       403:
 *         description: Forbidden (not an admin)
 */
router.delete('/:id', adminController.deleteOne);

module.exports = router;
