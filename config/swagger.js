const swaggerJSDoc = require("swagger-jsdoc");

// swagger definition
const swaggerDefinition = {
  info: {
    title: "In Harmony API",
    version: "1.0.0",
    description: "RESTful API for the In Harmony music store",
  },
  host: process.env.PORT || "localhost:3000",
  basePath: "/api",
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./routes/*.js"],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
