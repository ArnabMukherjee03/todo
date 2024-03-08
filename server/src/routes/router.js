const {
  register,
  login,
  logout,
  getUser,
} = require("../controllers/auth.controller");
const {
  createTodos,
  fetchTodosByUser,
  updateTodos,
  deleteTodo,
} = require("../controllers/todo.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const router = [
  {
    method: "POST",
    path: "/todo/create",
    options: {
      handler: createTodos,
      pre: [
        {
          method: verifyJwt,
        },
      ],
    },
  },
  {
    method: "POST",
    path: "/todo/get",
    options: {
      handler: fetchTodosByUser,
      pre: [
        {
          method: verifyJwt,
        },
      ],
    },
  },
  {
    method: "PUT",
    path: "/todo/update/{id}",
    handler: updateTodos,
  },
  {
    method: "DELETE",
    path: "/todo/{id}",
    handler: deleteTodo,
  },
  {
    method: "POST",
    path: "/auth/register",
    handler: register,
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: login,
  },
  {
    method: "GET",
    path: "/auth/logout",
    handler: logout,
  },
  {
    method: "GET",
    path: "/auth/getuser",
    options: {
      handler: getUser,
      pre: [
        {
          method: verifyJwt,
        },
      ],
    },
  },
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Hello from xyz!";
    },
  },
];

module.exports = router;
