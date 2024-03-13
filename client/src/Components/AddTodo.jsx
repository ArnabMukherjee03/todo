import React, { useContext, useState } from 'react'
import { todoContext } from '../Context/TodoContext';

export const AddTodo = () => {
  
  const {addTodo} = useContext(todoContext);
  const [todo,setTodo] = useState({
     task: "",
     description: ""
  });

  const handleInputChange = (event)=>{
    const { name, value } = event.target; 
    setTodo({ ...todo, [name]: value });
  }

  const submit = async(e)=>{
    e.preventDefault()
     const response = await addTodo(todo);

     if(response){
         setTodo({
             task: "",
             description: ""
         })
     }

  }

  return (
    <div className='w-[40%]'>
    <form onSubmit={submit} className="mb-4 flex flex-col gap-2 font-primary">
    <input
      type="text"
      value={todo.task}
      name='task'
      onChange={handleInputChange}
      placeholder="Add a new Todo"
      className="border border-blue-600 p-2 outline-none"
    />
    <textarea
      type="text"
      value={todo.description}
      name='description'
      onChange={handleInputChange}
      placeholder="Add todo description"
      className="border border-blue-600 p-2 outline-none"
    />
    <button
      className="bg-blue-600 text-white py-2 px-4 w-[30%] text-center font-primary float-left"
    >
      Add Todo
    </button>
    </form>
  </div>
  )
}
