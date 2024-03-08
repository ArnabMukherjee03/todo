import React, { useContext } from "react";
import { todoContext } from "../Context/TodoContext";
import { MdDelete } from "react-icons/md";

export const TodoList = () => {
  const { todo, deleteTodo, editTodo } = useContext(todoContext);

 
  return (
    <div className="mt-8 w-[40%] flex flex-col gap-4">
      
      {todo.length !== 0?
      todo?.map((todo) => {
        return (
          <div
            key={todo?.id}
            className="w-full flex relative"
          >
            <div className="w-[10%] flex justify-center items-center">
              <input
                type="checkbox"
                checked={todo?.completed}
                className="w-4 h-4 cursor-pointer"
                onChange={(e) => {
                  editTodo(todo.id, todo?.completed);
                }}
              />
            </div>
            <div className="w-[90%] font-primary text-lg">
              <p className={`${todo?.completed ? "line-through" : ""}`}>
                {todo?.task}
              </p>
              <p className="text-sm">{todo?.description}</p>
            </div>
            <p className="absolute right-0 bottom-0 text-sm font-primary">{todo?.createdAt.slice(0, 10)}</p>
            <div
              className="text-red-500 absolute  top-0 right-0 cursor-pointer"
              onClick={() => {
                deleteTodo(todo?.id);
              }}
            >
              <MdDelete className="w-full text-lg" />
            </div>
          </div>
        );
      }):
      (<div className="text-red text-lg font-primary text-red-500 p-8 text-center">No Data Found</div>)
      }
    </div>
  );
};
