import React, { useContext, useState } from 'react';
import { todoContext } from '../Context/TodoContext';
import { useDebounce } from '../hooks/useDebounce';

const Dropdown = () => {
  const [selected, setselected] = useState(null);
  const [search, setSearch] = useState("");

  const {subDropdown,setsubDropdown,getTodo} = useContext(todoContext);

  const handleDropdownChange = (event) => {
    setselected(event.target.value);
    setsubDropdown("");
  };

  const handleSubDropdownChange = (event) => {
    setsubDropdown(event.target.value);
  };

  const debouncedSearch = useDebounce((value) => {
     getTodo(value);
  });

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value)
    debouncedSearch(search);
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
            onChange={handleSearch}
            placeholder="Search..."
            className="w-60 p-2 border rounded-md outline-none border-blue-600"
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
