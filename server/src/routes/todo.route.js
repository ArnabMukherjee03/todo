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
    }
  ];
  
  module.exports = router;
  