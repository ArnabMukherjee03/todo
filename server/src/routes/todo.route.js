const {
  createTodos,
  fetchTodosByUser,
  updateTodos,
  deleteTodo,
} = require("../controllers/todo.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const Joi = require("joi");
const error = require("../utils/customError");
const { name } = require("../utils/queue");

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
      description:"Create A New Todo",
      notes: "Create a new to-do for the logged-in user",
      handler: createTodos,
      tags: ['api'],
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
      tags: ['api'],
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
    options:{
      handler: updateTodos,
      tags: ['api'],
    }
  },
  {
    method: "DELETE",
    path: "/todo/{id}",
    options:{
      handler: deleteTodo,
      tags: ['api']
    }
  },
];

module.exports = router;
