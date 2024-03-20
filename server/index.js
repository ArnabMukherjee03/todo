require("dotenv").config();
const server = require("./src/app");
const { connectDB } = require("./src/db/database");
const hapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Pack = require("./package.json");

// Database Connection
connectDB();

// IIFE Function for starting the server
(async () => {
  try {
    const swaggerOptions = {
      info: {
        title: "Todo API Documentation",
        version: Pack.version,
      },
      securityDefinitions: {
        jwt: {
          type: "Access Token",
          name: "authorization",
          in: "header",
        },
      },
      security: [{ jwt: [] }],
      schemes: ["http", "https"],
    };

    await server.register([
      Inert,
      Vision,
      {
        plugin: hapiSwagger,
        options: swaggerOptions,
      },
    ]);

    await server.start();
    console.log(`Server is running at ${server.info.uri}`);
  } catch (error) {
    console.log("Something Went Wrong", error);
  }
})();
