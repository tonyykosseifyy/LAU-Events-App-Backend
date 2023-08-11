const express = require('express');
const router = express.Router();
const clubEventController = require('../controllers/clubEventController.js');
const validate = require('../middlewares/validate');
const { getOneSchema, createSchema, updateSchema, deleteOneSchema } = require('../validations/clubEvent.validation');
const { isAdmin } = require('../middlewares/authJwt.js');

/**
 * @swagger
 * tags:
 *   name: ClubEvent
 *   description: ClubEvent management operations
 */

/**
 * @swagger
 * /clubEvent/:
 *  get:
 *    tags: [ClubEvent]
 *    summary: Get all ClubEvents
 *    description: Retrieve all ClubEvents
 *    responses:
 *      '200':
 *        description: A successful response, returns an array of ClubEvents
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  clubId:
 *                    type: integer
 *                    example: 1
 *                  eventId:
 *                    type: integer
 *                    example: 1
 *      '500':
 *        description: Server error
 */

router.get('/', clubEventController.getAll);

/**
 * @swagger
 * /clubEvent/{id}:
 *  get:
 *    tags: [ClubEvent]
 *    summary: Get a specific ClubEvent
 *    description: Retrieve a specific ClubEvent by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          example: 1
 *        required: true
 *        description: Numeric ID of the ClubEvent to retrieve
 *    responses:
 *      '200':
 *        description: A successful response, returns the ClubEvent
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                clubId:
 *                  type: integer
 *                  example: 1
 *                eventId:
 *                  type: integer
 *                  example: 1
 *      '404':
 *        description: ClubEvent not found
 *      '500':
 *        description: Server error
 */

router.get('/:id', validate([{ schema: getOneSchema, property: 'params' }]), clubEventController.getOne);

/**
 * @swagger
 * /clubEvent/:
 *  post:
 *    tags: [ClubEvent]
 *    summary: Create a new ClubEvent
 *    description: Create a new ClubEvent
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              clubId:
 *                type: integer
 *                example: 1
 *              eventId:
 *                type: integer
 *                example: 2
 *    responses:
 *      '201':
 *        description: Successfully created a new ClubEvent
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                clubId:
 *                  type: integer
 *                  example: 1
 *                eventId:
 *                  type: integer
 *                  example: 2
 *      '400':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */

router.post('/',isAdmin, validate([{ schema: createSchema, property: 'body' }]), clubEventController.create);

/**
 * @swagger
 * /clubEvent/{id}:
 *  put:
 *    tags: [ClubEvent]
 *    summary: Update a specific ClubEvent
 *    description: Update a specific ClubEvent by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          example: 1
 *        required: true
 *        description: Numeric ID of the ClubEvent to update
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              clubId:
 *                type: integer
 *                example: 1
 *              eventId:
 *                type: integer
 *                example: 2
 *    responses:
 *      '200':
 *        description: Successfully updated the ClubEvent
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                clubId:
 *                  type: integer
 *                  example: 1
 *                eventId:
 *                  type: integer
 *                  example: 2
 *      '400':
 *        description: Validation error
 *      '404':
 *        description: ClubEvent not found
 *      '500':
 *        description: Server error
 */

router.put('/:id',isAdmin, validate([
    { schema: updateSchema.params, property: 'params' },
    { schema: updateSchema.body, property: 'body' },
]), clubEventController.update);

/**
 * @swagger
 * /clubEvent/{id}:
 *  delete:
 *    tags: [ClubEvent]
 *    summary: Delete a specific ClubEvent
 *    description: Delete a specific ClubEvent by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          example: 1
 *        required: true
 *        description: Numeric ID of the ClubEvent to delete
 *    responses:
 *      '204':
 *        description: Successfully deleted the ClubEvent
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'Item deleted successfully'
 *      '404':
 *        description: ClubEvent not found
 *      '500':
 *        description: Server error
 */

router.delete('/:id',isAdmin, validate([{ schema: deleteOneSchema, property: 'params' }]), clubEventController.deleteOne);

module.exports = router;
