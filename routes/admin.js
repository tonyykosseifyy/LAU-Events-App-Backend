const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const validate = require('../middlewares/validate.js');
const { createAdminSchema, adminIdSchema } = require('../validations/admin.validation.js');
const { valid } = require('joi');


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: operations on admin models
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Admins:
 *       type: object
 *       properties:
 *         isVerified:
 *           type: boolean
 *         id:
 *           type: integer
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         userType:
 *           type: string
 *         updatedAt:
 *           type: string
 *         createdAt:
 *           type: string
 */



// GET all admins
/**
 * @swagger
 * /admins:
 *   get:
 *     tags: [Admin]
 *     description: Get all admins
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admins'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no token provided
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router.get('/', adminController.getAll);


// GET specific admin by ID
/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     tags: [Admin]
 *     description: Get specific admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 password:
 *                   type: string
 *                   example: P@ssw0rd
 *                 email:
 *                   type: string
 *                   example: firstName.lastName@lau.edu
 *                 userType:
 *                   type: string
 *                   example: User
 *                 isVerified:
 *                   type: boolean
 *                   example: true
 *                 verificationToken:
 *                   type: string
 *                   example: a01oiheq98fj139
 *                 createdAt:
 *                   type: string
 *                   example: 2023-08-05T14:11:05.000Z
 *                 updatedAt:
 *                   type: string
 *                   example: 2023-08-05T14:11:05.000Z
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no token provided
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */


router.get('/:id', validate(adminIdSchema, 'params') , adminController.getOne);


// POST create a new admin
/**
 * @swagger
 * /admins:
 *   post:
 *     tags: [Admin]
 *     description: Create a new admin
 *     parameters:
 *       - in: body
 *         name: admin
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1 (has to be a current user)
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   example: 2023-08-05T14:59:37.670Z
 *                 updatedAt:
 *                   type: string
 *                   example: 2023-08-05T14:59:37.670Z
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no token provided
 *       500:
 *         description: Server Error
 */

router.post('/', validate(createAdminSchema, 'body') ,adminController.create);

// DELETE specific admin by ID
/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     tags: [Admin]
 *     description: Delete specific admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no token provided
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router.delete('/:id', validate(adminIdSchema, 'params') , adminController.deleteOne);

module.exports = router;