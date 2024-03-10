/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

export const todoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState([]);

  const getTodo = async () => {
    try {
      const response = await axios.post("/todo/get");
      setTodo(response?.data?.data?.todo);
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  const addTodo = async (data) => {
    try {
      const response = await axios.post("/todo/create", data);
      const newData = [...todo, response?.data?.data?.todo];
      toast.success("Todo Created Successfully");
      setTodo(newData);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message)
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
      toast.error(error?.response?.data?.message)
    }
  };

  const editTodo = async (id, data) => {
    try {
      console.log(data);
      const response = await axios.put(`/todo/update/${id}`,data);
      console.log(response.data);
      if (response.data.status === "Success") {
        const update = todo?.map((todo) => {
          if (todo.id === id) {
             
              todo.task = data?.task;
              todo.description = data?.description;
              todo.completed = data?.completed;
            
              
          }

          return todo;
        });

       setTodo(update);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
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
