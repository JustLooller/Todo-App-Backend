import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Toduba Challenge API Documentation",
      version,
    },
    schemes: ["http"],
    components: {
      securitySchemes: {
        BearerAuthentication: {
          type: "http",
          description: "Provide a valid JWT Token in order to use this API",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
