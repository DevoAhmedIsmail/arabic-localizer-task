import React from "react";

export const SelectInput = ({ id, changeHandler, options }) => {
  return (
    <select
      name=""
      id={id}
      className="px-3 border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]"
      defaultValue="select"
      onChange={(e) => changeHandler(e.target.value)}
    >
      <option disabled value="select">
        Select
      </option>
      {options.map((data, index) => (
        <option key={index} className="text-[#404447]">
          {data}
        </option>
      ))}
    </select>
  );
};