import React, { useContext, useState } from 'react';
import { todoContext } from '../Context/TodoContext';

const Dropdown = () => {
  const [selected, setselected] = useState(null);
  

  const {getTodo,subDropdown, setsubDropdown,search,setSearch} = useContext(todoContext);

  const handleDropdownChange = (event) => {
    setselected(event.target.value);
    setsubDropdown(null);
  };

  const handleSubDropdownChange = (event) => {
    setsubDropdown(event.target.value);
    getTodo(event.target.value);
  };


  return (
    <div className="flex flex-col space-y-4 font-primary">
      <select
        value={selected}
        onChange={handleDropdownChange}
        className="w-40 p-2 border border-blue-600 outline-none rounded-md"
      >
        <option value="">Select</option>
        <option value="status">Status</option>
        <option value="description">Description</option>
      </select>

      {selected === 'status' && (
        <div>
          <select
            value={subDropdown}
            onChange={handleSubDropdownChange}
            className="w-40 p-2 border rounded-md border-blue-600 outline-none"
          >
            <option value="">Select</option>
            <option value="completed">Completed</option>
            <option value="incompleted">Incompleted</option>
          </select>
        </div>
      )}

      {selected === 'description' && (
        <div>
          <input
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search..."
            className="w-60 p-2 border rounded-md outline-none border-blue-600"
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
