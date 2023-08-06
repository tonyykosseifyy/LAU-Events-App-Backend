const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Documentation for User routes
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Management and retrieval of users
 */

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Retrieve a list of users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: A list of users
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get('/', userController.getAll);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Retrieve a user by ID
 *    tags: [Users]
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: Numeric ID of the user to retrieve
 *    responses:
 *      200:
 *        description: Specific user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get('/:id', userController.getOne);

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The created user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.post('/', userController.create);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update a user
 *    tags: [Users]
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: Numeric ID of the user to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The updated user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.put('/:id', userController.update);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Delete a user
 *    tags: [Users]
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: Numeric ID of the user to delete
 *    responses:
 *      200:
 *        description: The deleted user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.delete('/:id', userController.deleteOne);

module.exports = router;