const express = require('express');
const router = express.Router();
const userEventsController = require('../controllers/userEventsController.js');
const validate = require('../middlewares/validate');
const { getOneSchema, createSchema, updateSchema } = require('../validations/userEvent.validation');
const { isAdmin } = require('../middlewares/authJwt.js');

/**
 * @swagger
 * tags:
 *   name: UserEvents
 *   description: User event management operations
 */

/**
 * @swagger
 * /userEvents/:
 *  get:
 *    tags: [UserEvents]
 *    summary: Get all user events
 *    description: Retrieve all user events
 *    responses:
 *      '200':
 *        description: A successful response, returns an array of user events
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  userId:
 *                    type: integer
 *                    example: 1
 *                  eventId:
 *                    type: integer
 *                    example: 1
 *                  status:
 *                    type: string
 *                    example: "Accepted"
 *                  responseTime:
 *                    type: string
 *                    format: date-time
 *                    example: "2023-08-07T10:00:00.000Z"
 *      '500':
 *        description: Server error
 */

router.get('/',isAdmin, userEventsController.getAll);


/**
 * @swagger
 * /userEvents/{id}:
 *  get:
 *    tags: [UserEvents]
 *    summary: Get a user event by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the user event to retrieve
 *    responses:
 *      '200':
 *        description: A user event object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: integer
 *                  example: 1
 *                eventId:
 *                  type: integer
 *                  example: 1
 *                status:
 *                  type: string
 *                  example: "Accepted"
 *                responseTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T10:00:00.000Z"
 *      '404':
 *        description: User event not found
 *      '500':
 *        description: Server error
 */

router.get('/:id',isAdmin, validate([{ schema: getOneSchema, property: 'params' }]), userEventsController.getOne);

/**
 * @swagger
 * /userEvents/:
 *  post:
 *    tags: [UserEvents]
 *    summary: Create a new user event
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: integer
 *                example: 1
 *              eventId:
 *                type: integer
 *                example: 1
 *              status:
 *                type: string
 *                example: "Accepted"
 *    responses:
 *      '201':
 *        description: User event created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: integer
 *                  example: 1
 *                eventId:
 *                  type: integer
 *                  example: 1
 *                status:
 *                  type: string
 *                  example: "Accepted"
 *                responseTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T10:00:00.000Z"
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Server error
 */

router.post('/', validate([{ schema: createSchema, property: 'body' }]), userEventsController.create);

/**
 * @swagger
 * /userEvents/{id}:
 *  put:
 *    tags: [UserEvents]
 *    summary: Update a user event by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the user event to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                example: "Accepted"
 *    responses:
 *      '200':
 *        description: User event updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: integer
 *                  example: 1
 *                eventId:
 *                  type: integer
 *                  example: 1
 *                status:
 *                  type: string
 *                  example: "Accepted"
 *                responseTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T10:00:00.000Z"
 *      '404':
 *        description: User event not found
 *      '500':
 *        description: Server error
 */

router.put('/:id', validate([
    { schema: updateSchema.params, property: 'params' },
    { schema: updateSchema.body, property: 'body' },
]), userEventsController.update);

/**
 * @swagger
 * /userEvents/{id}:
 *  delete:
 *    tags: [UserEvents]
 *    summary: Delete a user event by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the user event to delete
 *    responses:
 *      '204':
 *        description: User event deleted successfully
 *      '404':
 *        description: User event not found
 *      '500':
 *        description: Server error
 */

router.delete('/:id',isAdmin, validate([{ schema: getOneSchema, property: 'params' }]), userEventsController.deleteOne);

module.exports = router;
