import swaggerjsdoc from "swagger-jsdoc";
import { version } from "../package.json";


const options: swaggerjsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Toduba Challenge API Documentation",
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "jwt",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerjsdoc(options);


