const { Todo } = require("../models");
const response = require("../utils/ApiResponse");
const error = require("../utils/customError");

const createTodos = async (req, res) => {
  try {
    const { task } = req.payload;

    const todo = await Todo.create({ ...req.payload, user: req.user.id });

    return response(res, { todo: todo }, "Todo Created Successfully", 201);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const updateTodos = async (req, res) => {
  try {
    const { id } = req.params;

    const updated_Todo = await Todo.update(req.payload, {
      where: {
        id: id,
      },
    });

    const todo = await Todo.findOne({ where: { id: id } });

    return response(res, { todo: todo }, "Todo updated Successfully", 200);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const fetchTodosByUser = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { user: req.user.id } });
    return response(res, { todo: todos }, "Todo Fetched Successfully", 200);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id: id } });

    await Todo.destroy({
      where: { id: id },
    });

    return response(res, { todo: todo }, "Todo Deleted Successfully", 200);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

module.exports = {
  createTodos,
  updateTodos,
  fetchTodosByUser,
  deleteTodo,
};
