const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LAU Events App API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Admin: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The admin ID.',
              example: 1,
            },
          },
        },
        Club: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The club ID.',
              example: 1,
            },
            clubName: {
              type: 'string',
              description: 'The name of the club.',
              example: 'Computer Science Club',
            }
          },
        },
        ClubEvent: {
          type: 'object',
          properties: {
            clubId: {
              type: 'integer',
              description: 'The ID of the club.',
              example: 1,
            },
            eventId: {
              type: 'integer',
              description: 'The ID of the event.',
              example: 2,
            },
          },
        },
        DashboardStats: {
          type: 'object',
          properties: {
            eventCount: {
              type: 'integer',
              description: 'Count of all events.',
              example: 100,
            },
            clubCount: {
              type: 'integer',
              description: 'Count of all clubs.',
              example: 20,
            },
            accpetanceRate: {
              type: 'integer',
              description: 'Acceptance rate of user events.',
              example: 75,
            },
            declineRate: {
              type: 'integer',
              description: 'Decline rate of user events.',
              example: 25,
            },
          },
        },
        Event: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Event ID.',
              example: 1,
            },
            eventName: {
              type: 'string',
              description: 'Event name.',
              example: 'Event 1',
            },
            eventDescription: {
              type: 'string',
              description: 'Event description.',
              example: 'This is an event.',
            },
            startTime: {
              type: 'string',
              format: 'date-time',
              description: 'Start time of the event.',
              example: '2023-07-25T00:00:00Z',
            },
            endTime: {
              type: 'string',
              format: 'date-time',
              description: 'End time of the event.',
              example: '2023-07-26T00:00:00Z',
            },
            creationDate: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date of the event.',
              example: '2023-07-20T00:00:00Z',
            },
            status: {
              type: 'string',
              enum: ['Active', 'Cancelled'],
              description: 'Status of the event.',
              example: 'Active',
            },
          },
        },
        EventDetails: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Event ID.',
              example: 1,
            },
            eventName: {
              type: 'string',
              description: 'Event name.',
              example: 'Event 1',
            },
            eventDescription: {
              type: 'string',
              description: 'Event description.',
              example: 'This is an event.',
            },
            startTime: {
              type: 'string',
              format: 'date-time',
              description: 'Start time of the event.',
              example: '2023-07-25T00:00:00Z',
            },endTime: {
              type: 'string',
              format: 'date-time',
              description: 'End time of the event.',
              example: '2023-07-26T00:00:00Z',
            },
            creationDate: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date of the event.',
              example: '2023-07-20T00:00:00Z',
            },
            status: {
              type: 'string',
              enum: ['Active', 'Cancelled'],
              description: 'Status of the event.',
              example: 'Active',
            },
            Club: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  clubName: {
                    type: 'string',
                    description: 'Associated club name.',
                    example: 'Club 1',
                  },
                },
              },
            },
            User: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    description: 'Accepted user email.',
                    example: 'user@example.com',
                  },
                },
              },
            },
          
          }
        },
        RefreshToken: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The refresh token ID.',
              example: 1,
            },
            token: {
              type: 'string',
              description: 'The refresh token.',
              example: 'b33f3b3a-7a5d-4b85-9357-e1a96ed2b41e',
            },
            expiryDate: {
              type: 'string',
              format: 'date-time',
              description: 'Expiry date of the refresh token.',
              example: '2023-07-25T00:00:00Z',
            },
          },
        },
        UserEvent: {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              description: 'The ID of the user.',
              example: 1,
            },
            eventId: {
              type: 'integer',
              description: 'The ID of the event.',
              example: 2,
            },
            status: {
              type: 'string',
              enum: ['Ignored', 'Accepted', 'Declined'],
              description: 'The status of the user\'s response to the event invitation.',
              example: 'Accepted',
            },
            responseTime: {
              type: 'string',
              format: 'date-time',
              description: 'The time of the user\'s response to the event invitation.',
              example: '2023-07-20T00:00:00Z',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID.',
              example: 1,
            },
            password: {
              type: 'string',
              description: 'Password for the user.',
              example: 'password123',
            },
            email: {
              type: 'string',
              description: 'Email of the user.',
              example: 'example@example.com',
            },
            userType: {
              type: 'string',
              enum: ['Admin', 'User'],
              description: 'Type of the user.',
              example: 'User',
            },
            isVerified: {
              type: 'boolean',
              description: 'Whether the user is verified or not.',
              example: false,
            },
            verificationToken: {
              type: 'string',
              description: 'Verification token for the user.',
              example: 'b33f3b3a-7a5d-4b85-9357-e1a96ed2b41e',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

};

