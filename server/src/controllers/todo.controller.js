const Todo = require("../models/todo.model");

const createTodos = async (req, res) => {
  try {
    await Todo.sync({ alter: true });
    const { task, user } = req.payload;

    if(
        [task,user].some((field) => field?.trim() === "")
    ) {
      throw new Error("Task and User Fields Are Required");
    }

    const todo = await Todo.create(req.payload);

    return res.response({
      status: "Success",
      data: {
        todo: todo,
      },
      message: "Todo created Successfully",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateTodos = async (req, res) => {
  try {
    await Todo.sync({ alter: true });
  } catch (err) {
    console.log(err);
    const error = {
        statusCode : err.statusCode,
        status: "failed",
        message: err.message
    }
    return res.response(error).code(err.statusCode);
  }
};

const fetchTodosByUser = async (req, res) => {
  try {
    const {user} = req.payload;
    await Todo.sync({ alter: true });
    const todos = await Todo.findAll( {where: {user: user}});
    return res.response({
        status: "Success",
        data: {
          todo: todos,
        },
        message: "Fetched all todos Successfully",
      }).code(200);
  } catch (error) {
    return error;
  }
};

const deleteTodo = async (req, res) => {
  try {
    const {id} = req.params;

    const todo = await Todo.destroy({
        where: {id: id}
    })

    console.log(todo);
    return res.response({
        status: "Success",
        data: {
          todo: todo,
        },
        message: "todo deleted successfully",
      });
  } catch (error) {
    return error;
  }
};

module.exports = {
  createTodos,
  updateTodos,
  fetchTodosByUser,
  deleteTodo,
};
