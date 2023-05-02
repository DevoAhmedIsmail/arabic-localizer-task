import React from "react";

export const SelectInput = ({ id, changeHandler, options, isError, value }) => {
  // console.log(id,'=>>',value);
  return (
    <select
      name=""
      id={id}
      className={`px-3 border ${
        isError ? "border-red-400" : "border-[#aaaaaad6]"
      }  focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]`}
      defaultValue={value ? value : "select"}
      // onChange={(e) => changeHandler(e.target.value)}
      onChange={(e) =>
        changeHandler((prev) => ({ ...prev, [id]: e.target.value }))
      }
      // value={value}
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
