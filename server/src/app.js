const Hapi = require("@hapi/hapi");
const router = require("./routes/router");

const port = process.env.PORT || 8000;

const server = Hapi.server({
  port: parseInt(port),
  host: "localhost",
  routes: {
    cors: {
      origin: ["http://localhost:3000"],
      headers: ["Accept", "Content-Type", "Authorization"],
      additionalHeaders: ["X-Requested-With"],
    },
  },
});

router.forEach((path) => server.route(path));

module.exports = server;
