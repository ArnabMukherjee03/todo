const todoRouter = require("./todo.route");
const authRouter = require("./auth.route");

const router = [...authRouter, ...todoRouter];
module.exports = router;
