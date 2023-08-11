const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const validate = require('../middlewares/validate');
const { getOneSchema } = require('../validations/users.validation');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /users/:
 *  get:
 *    tags: [Users]
 *    summary: Get all users
 *    description: Retrieve all users
 *    responses:
 *      '200':
 *        description: A successful response, returns an array of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  password:
 *                    type: string
 *                    example: "hashed_password"
 *                  email:
 *                    type: string
 *                    example: "user@example.com"
 *                  userType:
 *                    type: string
 *                    example: "User"
 *                  isVerified:
 *                    type: boolean
 *                    example: false
 *                  verificationToken:
 *                    type: string
 *                    example: "verification_token"
 *                  major:
 *                    type: string
 *                    example: "Computer Science"
 *      '500':
 *        description: Server error
 */

router.get('/', userController.getAll);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    tags: [Users]
 *    summary: Get a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the user to retrieve
 *    responses:
 *      '200':
 *        description: A user object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                password:
 *                  type: string
 *                  example: "hashed_password"
 *                email:
 *                  type: string
 *                  example: "user@example.com"
 *                userType:
 *                  type: string
 *                  example: "User"
 *                isVerified:
 *                  type: boolean
 *                  example: false
 *                verificationToken:
 *                  type: string
 *                  example: "verification_token"
 *                major:
 *                  type: string
 *                  example: "Computer Science"
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Server error
 */

router.get('/:id', validate([{ schema: getOneSchema, property: 'params' }]), userController.getOne);


/**
 * @swagger
 * /users/{id}:
 *  put:
 *    tags: [Users]
 *    summary: Update a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the user to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *                example: "new_hashed_password"
 *              email:
 *                type: string
 *                example: "new_user@example.com"
 *              userType:
 *                type: string
 *                example: "Admin"
 *              isVerified:
 *                type: boolean
 *                example: true
 *              verificationToken:
 *                type: string
 *                example: "new_verification_token"
 *              major:
 *                type: string
 *                example: "Data Science"
 *    responses:
 *      '200':
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                password:
 *                  type: string
 *                  example: "new_hashed_password"
 *                email:
 *                  type: string
 *                  example: "new_user@example.com"
 *                userType:
 *                  type: string
 *                  example: "Admin"
 *                isVerified:
 *                  type: boolean
 *                  example: true
 *                verificationToken:
 *                  type: string
 *                  example: "new_verification_token"
 *                major:
 *                  type: string
 *                  example: "Data Science"
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Server error
 */
// currently not available 

// router.put('/:id', validate([
//     { schema: updateSchema.params, property: 'params' },
//     { schema: updateSchema.body, property: 'body' },
// ]), userController.update);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags: [Users]
 *    summary: Delete a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the user to delete
 *    responses:
 *      '204':
 *        description: User deleted successfully
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Server error
 */

// currently not available 

// router.delete('/:id', validate([{ schema: getOneSchema, property: 'params' }]), userController.deleteOne);

module.exports = router;
