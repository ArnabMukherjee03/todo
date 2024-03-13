import React, { useContext} from 'react'
import { todoContext } from '../Context/TodoContext'

export const Pagination = () => {
    const {total,current,setCurrent} = useContext(todoContext);
  return (
    <div className='flex font-primary items-center justify-center my-4 gap-4'>
        <button disabled={current===1} onClick={()=>{setCurrent(current-1)}} className="bg-blue-600 py-2 px-4 text-white cursor-pointer">Prev</button>
        <span>{current}/{total}</span>
        <button disabled={current === total} onClick={()=>{setCurrent(current+1)}} className="bg-blue-600 py-2 px-4 text-white cursor-pointer">Next</button>
    </div>
  )
}
