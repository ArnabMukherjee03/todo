const { Todo } = require("../models");

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
  } catch (error) {
    console.log(error);
    return error;
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
    console.log(err);
    const error = {
      statusCode: err.statusCode,
      status: "failed",
      message: err.message,
    };
    return res.response(error).code(err.statusCode);
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
  } catch (error) {
    console.log(error);
    return error;
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
