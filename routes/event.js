const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');
const validate = require('../middlewares/validate.js');
const { getOneSchema, createSchema, updateSchema } = require('../validations/event.validation.js');

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Event management operations
 */

/**
 * @swagger
 * /event/:
 *  get:
 *    tags: [Event]
 *    summary: Get all events
 *    description: Retrieve all events
 *    responses:
 *      '200':
 *        description: A successful response, returns an array of events
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  eventName:
 *                    type: string
 *                    example: "AI Seminar"
 *                  eventDescription:
 *                    type: string
 *                    example: "A seminar on the latest AI research"
 *                  startTime:
 *                    type: string
 *                    format: date-time
 *                    example: "2023-08-07T09:30:00.000Z"
 *                  endTime:
 *                    type: string
 *                    format: date-time
 *                    example: "2023-08-07T11:30:00.000Z"
 *                  status:
 *                    type: string
 *                    example: "Scheduled"
 *      '500':
 *        description: Server error
 */

router.get('/', eventController.getAll);

/**
 * @swagger
 * /event/{id}:
 *  get:
 *    tags: [Event]
 *    summary: Get a single event
 *    description: Retrieve a single event by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The ID of the event to retrieve
 *    responses:
 *      '200':
 *        description: A successful response, returns the event object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                eventName:
 *                  type: string
 *                  example: "AI Seminar"
 *                eventDescription:
 *                  type: string
 *                  example: "A seminar on the latest AI research"
 *                startTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T09:30:00.000Z"
 *                endTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T11:30:00.000Z"
 *                status:
 *                  type: string
 *                  example: "Scheduled"
 *      '404':
 *        description: Item not found
 *      '500':
 *        description: Server error
 */

router.get('/:id', validate([{schema: getOneSchema, property: 'params'}]), eventController.getOne);

/**
 * @swagger
 * /event/:
 *  post:
 *    tags: [Event]
 *    summary: Create a new event
 *    description: Create a new event
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - eventName
 *              - eventDescription
 *              - startTime
 *              - endTime
 *              - status
 *            properties:
 *              eventName:
 *                type: string
 *                example: "AI Seminar"
 *              eventDescription:
 *                type: string
 *                example: "A seminar on the latest AI research"
 *              startTime:
 *                type: string
 *                format: date-time
 *                example: "2023-08-07T09:30:00.000Z"
 *              endTime:
 *                type: string
 *                format: date-time
 *                example: "2023-08-07T11:30:00.000Z"
 *              status:
 *                type: string
 *                example: "Scheduled"
 *              clubIds:
 *                type: array
 *                items:
 *                  type: integer
 *                example: [1, 2]
 *    responses:
 *      '201':
 *        description: A successful response, returns the created event object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                eventName:
 *                  type: string
 *                  example: "AI Seminar"
 *                eventDescription:
 *                  type: string
 *                  example: "A seminar on the latest AI research"
 *                startTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T09:30:00.000Z"
 *                endTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T11:30:00.000Z"
 *                status:
 *                  type: string
 *                  example: "Scheduled"
 *      '500':
 *        description: Server error
 */

router.post('/', validate([{schema: createSchema, property: 'body'}]), eventController.create);

/**
 * @swagger
 * /event/{id}:
 *  put:
 *    tags: [Event]
 *    summary: Update an event
 *    description: Update an existing event by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The ID of the event to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              eventName:
 *                type: string
 *                example: "AI Seminar"
 *              eventDescription:
 *                type: string
 *                example: "A seminar on the latest AI research"
 *              startTime:
 *                type: string
 *                format: date-time
 *                example: "2023-08-07T09:30:00.000Z"
 *              endTime:
 *                type: string
 *                format: date-time
 *                example: "2023-08-07T11:30:00.000Z"
 *              status:
 *                type: string
 *                example: "Scheduled"
 *    responses:
 *      '200':
 *        description: A successful response, returns the updated event object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                eventName:
 *                  type: string
 *                  example: "AI Seminar"
 *                eventDescription:
 *                  type: string
 *                  example: "A seminar on the latest AI research"
 *                startTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T09:30:00.000Z"
 *                endTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T11:30:00.000Z"
 *                status:
 *                  type: string
 *                  example: "Scheduled"
 *      '404':
 *        description: Item not found
 *      '500':
 *        description: Server error
 */

router.put('/:id', validate([
    {schema: updateSchema.params, property: 'params'},
    {schema: updateSchema.body , property: 'body'}
]), eventController.update);

/**
 * @swagger
 * /event/{id}:
 *  delete:
 *    tags: [Event]
 *    summary: Delete an event
 *    description: Delete an event by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The ID of the event to delete
 *    responses:
 *      '204':
 *        description: Item deleted successfully
 *      '404':
 *        description: Item not found
 *      '500':
 *        description: Server error
 */

router.delete('/:id', validate([{schema: getOneSchema, property: 'params'}]), eventController.deleteOne);

/**
 * @swagger
 * /event/{id}/details:
 *  get:
 *    tags: [Event]
 *    summary: Get event details
 *    description: Retrieve details of a single event by ID, including associated clubs and users who have accepted the event
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The ID of the event to retrieve details for
 *    responses:
 *      '200':
 *        description: A successful response, returns the event details object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                eventName:
 *                  type: string
 *                  example: "AI Seminar"
 *                eventDescription:
 *                  type: string
 *                  example: "A seminar on the latest AI research"
 *                startTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T09:30:00.000Z"
 *                endTime:
 *                  type: string
 *                  format: date-time
 *                  example: "2023-08-07T11:30:00.000Z"
 *                status:
 *                  type: string
 *                  example: "Scheduled"
 *                Clubs:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      clubName:
 *                        type: string
 *                        example: "AI Club"
 *                Users:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      email:
 *                        type: string
 *                        example: "user@example.com"
 *                declinedUsers:
 *                  type: integer
 *                  example: 5
 *      '404':
 *        description: Event not found
 *      '500':
 *        description: Server error
 */

router.get('/:id/details', eventController.getEventDetails);

/**
 * @swagger
 * /event/:
 *  delete:
 *    tags: [Event]
 *    summary: Delete all events
 *    description: Delete all events and associated records
 *    responses:
 *      '200':
 *        description: All events and associated records deleted successfully
 *      '500':
 *        description: Server error
 */

router.delete('/', eventController.deleteAll)

module.exports = router;
