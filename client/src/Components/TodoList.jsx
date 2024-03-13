import React, { useContext, useEffect, useState } from "react";
import { todoContext } from "../Context/TodoContext";
import { MdDelete } from "react-icons/md";
import { CiEdit,CiSaveUp2 } from "react-icons/ci";
import { Pagination } from "./Pagination";
import Dropdown from "./DropDown";

export const TodoList = () => {
  const { todo, deleteTodo, editTodo, getTodo,current,subDropdown,search} = useContext(todoContext);
  const [edit,setEdit] = useState(null);

  console.log("TodoList",search);

  useEffect(()=>{
    getTodo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[current,subDropdown,search])



  const [updateData,setUpdateData] = useState({
    task: "",
    description: ""
  })

  const handleChange = (event)=>{
    const { name, value } = event.target; 
    setUpdateData({ ...updateData, [name]: value });
  }



  const handleUpdate = ()=>{
    editTodo(edit,updateData);
    setEdit(null);
  }

  
 
  return (
    <div className="mt-8 w-[40%] flex flex-col gap-4">
      <Dropdown/>
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
                disabled={edit}
                checked={todo?.completed}
                className="w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                onChange={(e) => {
                  editTodo(todo.id, {task:todo?.task,description:todo?.description,completed: !todo?.completed});
                }}
              />
            </div>
            <div className="w-[90%] font-primary text-lg">
              {
              edit && todo?.id === edit?
              <form className="flex flex-col">
                  <input className="w-[80%] h-6" onChange={handleChange} value={updateData?.task} type="text" id="task" name="task" />
                  <input className="w-[80%] h-8" onChange={handleChange} value={updateData?.description} name="description" id="description" />
              </ form>
              :
              <>
              <p className={`${todo?.completed ? "line-through" : ""}`}>
                {todo?.task}
              </p>
              <p className="text-sm">{todo?.description}</p>
              </>
               }       
            </div>
            <p className="absolute right-0 bottom-0 text-sm font-primary">{todo?.createdAt.slice(0, 10)}</p>
            <div  className="absolute top-0 right-6 cursor-pointer">
              {
              edit && todo?.id === edit?
              <CiSaveUp2 onClick={handleUpdate} className="text-lg"/>
              :
              !todo.completed?<CiEdit onClick={()=>{setEdit(todo?.id); setUpdateData({task: todo?.task, description: todo?.description})}} className="text-lg"/>:""
              }
            </div>
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

      {/* Pagination */}
      <Pagination/>
    </div>
  );
};
