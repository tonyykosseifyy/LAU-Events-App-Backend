const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API title',
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
            name: {
              type: 'string',
              description: 'The admin name.',
              example: 'John Doe',
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
