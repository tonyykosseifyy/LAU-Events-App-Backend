const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController.js');
const validate = require('../middlewares/validate.js');
const { getOneSchema, createSchema, updateSchema, deleteOneSchema } = require('../validations/club.validation.js');
/**
 * @swagger
 * tags:
 *   name: Club
 *   description: Club management operations
 */

/**
 * @swagger
 * /clubs/:
 *  get:
 *    tags: [Club]
 *    summary: Get all clubs
 *    description: Retrieve all clubs
 *    responses:
 *      '200':
 *        description: A successful response, returns an array of clubs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  clubName:
 *                    type: string
 *                  status:
 *                    type: string
 *                    enum: ['active', 'inactive']
 *      '500':
 *        description: Server error
 */

router.get('/', clubController.getAll);

/**
 * @swagger
 * /clubs/{id}:
 *  get:
 *    tags: [Club]
 *    summary: Get a specific club
 *    description: Retrieve a specific club by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the club to retrieve
 *    responses:
 *      '200':
 *        description: A successful response, returns the club
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                clubName:
 *                  type: string
 *                status:
 *                  type: string
 *                  enum: ['active', 'inactive']
 *      '404':
 *        description: Club not found
 *      '500':
 *        description: Server error
 */

router.get('/:id', validate(getOneSchema, 'params'), clubController.getOne);

/**
 * @swagger
 * /clubs/{id}/events:
 *  get:
 *    tags: [Club]
 *    summary: Get a specific club with its events
 *    description: Retrieve a specific club by its ID along with its events
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the club to retrieve
 *    responses:
 *      '200':
 *        description: A successful response, returns the club with its events
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                clubName:
 *                  type: string
 *                status:
 *                  type: string
 *                  enum: ['active', 'inactive']
 *                events:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      eventId:
 *                        type: integer
 *                      eventName:
 *                        type: string
 *                      eventDate:
 *                        type: string
 *                        format: date
 *      '404':
 *        description: Club not found
 *      '500':
 *        description: Server error
 */

router.get('/:id/events', validate(getOneSchema, 'params'), clubController.getWithEvents);

/**
 * @swagger
 * /clubs/:
 *  post:
 *    tags: [Club]
 *    summary: Create a new club
 *    description: Create a new club
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              clubName:
 *                type: string
 *              status:
 *                type: string
 *                enum: ['active', 'inactive']
 *    responses:
 *      '201':
 *        description: Successfully created a new club
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                clubName:
 *                  type: string
 *                status:
 *                  type: string
 *                  enum: ['active', 'inactive']
 *      '400':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */

router.post('/', validate(createSchema, 'body'), clubController.create);

/**
 * @swagger
 * /clubs/{id}:
 *  put:
 *    tags: [Club]
 *    summary: Update a specific club
 *    description: Update a specific club by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the club to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              clubName:
 *                type: string
 *              status:
 *                type: string
 *                enum: ['active', 'inactive']
 *    responses:
 *      '200':
 *        description: Successfully updated the club
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                clubName:
 *                  type: string
 *                status:
 *                  type: string
 *                  enum: ['active', 'inactive']
 *      '400':
 *        description: Validation error
 *      '404':
 *        description: Club not found
 *      '500':
 *        description: Server error
 */

router.put('/:id', validate(updateSchema, 'params'), clubController.update);

/**
 * @swagger
 * /clubs/{id}:
 *  delete:
 *    tags: [Club]
 *    summary: Delete a specific club
 *    description: Delete a specific club by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the club to delete
 *    responses:
 *      '204':
 *        description: Successfully deleted the club
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'Item deleted successfully'
 *      '404':
 *        description: Club not found
 *      '500':
 *        description: Server error
 */

router.delete('/:id', validate(deleteOneSchema, 'params'), clubController.deleteOne);

module.exports = router;
