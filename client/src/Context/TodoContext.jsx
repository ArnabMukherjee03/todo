/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";

export const todoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState([]);

  const getTodo = async () => {
    try {
      const response = await axios.post("/todo/get");
      setTodo(response?.data?.data?.todo);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (data) => {
    try {
      const response = await axios.post("/todo/create", data);
      const newData = [...todo, response?.data?.data?.todo];
      setTodo(newData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
      
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`/todo/${id}`);
      console.log(response.data.status);
      if (response.data.status === "Success") {
        const updated_todo = todo.filter((todo) => {
          return todo.id !== id;
        });

        setTodo(updated_todo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id, completed) => {
    try {
      const response = await axios.put(`/todo/update/${id}`, {
        completed: !completed,
      });
      console.log(response.data);
      if (response.data.status === "Success") {
        const update = todo?.map((todo) => {
          if (todo.id === id) {
            todo.completed = !completed;
          }

          return todo;
        });

       setTodo(update);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <todoContext.Provider
      value={{ getTodo, todo, deleteTodo, addTodo, editTodo }}
    >
      {children}
    </todoContext.Provider>
  );
};

export default TodoProvider;
