/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const todoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [subDropdown, setsubDropdown] = useState(null);
  const [search, setSearch] = useState("");

  console.log(todo);
  const getTodo = async () => {
    try {
      let url = `/todo/get?page=${current}&limit=5`;

      if (subDropdown) {
        setCurrent(1);
        url =
          subDropdown === "completed"
            ? `/todo/get?page=${current}&limit=5&completed=true`
            : `/todo/get?page=${current}&limit=5&completed=false`;
      }

      if (search.length !== 0) {
        url = `/todo/get?page=${current}&limit=5&search=${search}`;
      }

      console.log(url);

      const response = await axios.post(url);
      const responseData = response?.data?.data;
      setTodo(responseData.todo);
      setTotal(responseData.totalPages);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const addTodo = async (data) => {
    try {
      const response = await axios.post("/todo/create", data);
      const newData = [response?.data?.data?.todo, ...todo];
      toast.success("Todo Created Successfully");
      setTodo(newData.slice(0, 5));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return false;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`/todo/${id}`);
      if (response.data.status === "Success") {
        getTodo();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const editTodo = async (id, data) => {
    try {
      const response = await axios.put(`/todo/update/${id}`, data);
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
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <todoContext.Provider
      value={{
        getTodo,
        todo,
        deleteTodo,
        addTodo,
        editTodo,
        total,
        current,
        setCurrent,
        subDropdown,
        setsubDropdown,
        search,
        setSearch,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

export default TodoProvider;
