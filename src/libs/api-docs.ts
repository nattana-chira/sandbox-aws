import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs',
      version: '1.0.0',
      description: 'API documentation using Swagger and Node.js',
    },
  },
  apis: [
    `./src/apps/aws-sqs/entry-points/*.ts`,
    `./src/apps/aws-sns/entry-points/*.ts`,
  ],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions)

export const apiDocMiddleWare = swaggerUi.serve
export const apiDocUi = swaggerUi.setup(swaggerSpec)