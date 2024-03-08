const { Todo } = require("../models");
// const ApiError = require("../utils/ApiError");
const error = require("../utils/customError");

const createTodos = async (req, res) => {
  try {
    const {task} = req.payload;

    if ([task].some((field) => field?.trim() === "")) {
      throw new Error("Task and User Fields Are Required");
    }

    const todo = await Todo.create({...req.payload,user:req.user.id});

    return res.response({
      status: "Success",
      data: {
        todo: todo,
      },
      message: "Todo created Successfully",
    });
  } catch (err) {
    throw error({ message: err.message,status: "failure"}, err.message)
  }
};

const updateTodos = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updated_Todo = await Todo.update(
      req.payload,
      {
        where: {
          id: id
        },
      }
    );

    const todo = await Todo.findOne({ where: { id: id } });

    return res.response({
      status: "Success",
      data: {
        todo: todo,
      },
      message: "Todo updated Successfully",
    });

  } catch (err) {
    throw error({ message: err.message,status: "failure"}, err.message)
  }
};

const fetchTodosByUser = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { user: req.user.id } });
    return res
      .response({
        status: "Success",
        data: {
          todo: todos,
        },
        message: "Fetched all todos Successfully",
      })
      .code(200);
  } catch (err) {
    throw error({ message: err.message,status: "failure"}, err.message)
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id: id } });

    await Todo.destroy({
      where: { id: id },
    });

    

    return res.response({
      status: "Success",
      data: {
        todo: todo,
      },
      message: "todo deleted successfully",
    });
  } catch (err) {
    throw error({ message: err.message,status: "failure"}, err.message)
  }
};

module.exports = {
  createTodos,
  updateTodos,
  fetchTodosByUser,
  deleteTodo,
};
