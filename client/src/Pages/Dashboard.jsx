import React, { useContext, useEffect } from 'react';
import { authContext } from '../Context/AuthContext';
import { AddTodo } from '../Components/AddTodo';
import { TodoList } from '../Components/TodoList';
import { todoContext } from '../Context/TodoContext';

const Dashboard = ()=> {
    const {handleLogout} = useContext(authContext);
    const {getTodo} = useContext(todoContext);

    useEffect(()=>{
      getTodo()
    },[]) 
    
    return (
    <div className="container mx-auto mt-2">
      <button className="bg-blue-600 hover:bg-blue-400 font-primary text-white px-4 py-2 float-right mr-4" onClick={handleLogout}>
        Logout
      </button>
      <div className="mt-10 flex  w-full items-center justify-center flex-col">
       <AddTodo/>
      <TodoList/>
      </div>
    </div>
  );
}

export default Dashboard;
