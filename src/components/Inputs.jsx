import React from "react";
import Select from 'react-select';
import '../App.css'

export const SelectInput = ({ id, changeHandler, options, isError, value,isLoading }) => {

  return (
    <Select
       defaultValue={value}
       classNamePrefix="react-select"
       onChange={(e) =>
        changeHandler((prev) => ({ ...prev, [id]: e.value }))
      }
       isLoading={isLoading}
       // isClearable={isClearable}
       isSearchable={false}
       name=""
       options={options.map(option=>({value: option,label: option}))}
      //  value={value}
      className={`  ${isError ? "border-red-400" : "border-[#aaaaaad6]"}  focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]`}
      />
  );
};


/*
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
*/

/*
 <Select
       classNamePrefix="select"
       defaultValue={options[0]}
       onChange={(e) => changeHandler(e.target.value)}
       isLoading={loading}
       // isClearable={isClearable}
       isSearchable={false}
       name=""
       options={options.map(option=>({value: option,label: option}))}
       value={value}
      />
*/