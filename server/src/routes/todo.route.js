const {
  createTodos,
  fetchTodosByUser,
  updateTodos,
  deleteTodo,
} = require("../controllers/todo.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const Joi = require("joi");
const error = require("../utils/customError");

const todoSchema = Joi.object({
  task: Joi.string().required().messages({
    "any.required": "task is required.",
  }),
  description: Joi.string()
});

const router = [
  {
    method: "POST",
    path: "/todo/create",
    options: {
      handler: createTodos,
      validate:{ 
        payload: todoSchema,
      failAction: (request, h, err) => {
        const details = err.details;
        console.log(details);
        throw error(
          { message: details[0].message, status: "failure" },
          details[0].message
        );
      }},
      pre: [
        {
          method: verifyJwt,
        },
      ],
    },
  }
  ,
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
];

module.exports = router;
