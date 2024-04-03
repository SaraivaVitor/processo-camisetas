import React from "react";

const FilterSection = ({title, filters, handleChange}) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold mt-4">{title}</h1>
      {filters.map((filter) => (
        <div className="flex align-middle my-2">
          <input className="mr-2" type="checkbox" value={filter} onChange={handleChange} />
          <label className="text-gray-500">{filter}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
