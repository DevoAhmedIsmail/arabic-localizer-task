import React, { useState } from "react";
import Select from "react-select";
import "../App.css";
import makeAnimated from "react-select/animated";

export const SelectInput = ({
  id,
  changeHandler,
  options,
  isError,
  value,
  label,
  isLoading,
}) => {
  // console.log(id," => ",options);
  return (
    <Select
      // value={{ id: value || "Select", name: label || "Select" }}
      value={options.find((e) => e.value == value)}
      classNamePrefix="react-select"
      onChange={(e, action) => {
        console.log(e, action);
        changeHandler((prev) => ({ ...prev, [id]: e.value }));
      }}
      isLoading={isLoading}
      // isClearable={isClearable}
      isSearchable={true}
      name=""
      options={options}
      // getOptionLabel={(opt) => opt.name}
      // getOptionValue={(opt) => opt.id}
      //  value={value}
      className={`  ${
        isError ? "border-red-400" : "border-[#aaaaaad6]"
      }  focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]`}
    />
  );
};

const animatedComponents = makeAnimated();
export const SelectMultiInput = ({
  id,
  changeHandler,
  options,
  isError,
  value,
  isLoading,
}) => {
  const defaultValue = value.map((val) => ({ value: val.id, label: val.name }));
  // console.log('MultiL ', value);
  // console.log('defaultValue ', defaultValue);
  // console.log(id," => ",options);

  return (
    <Select
      // value={{ value: value || "Select", label: label || "Select" }}
      value={defaultValue}
      classNamePrefix="react-select"
      isSearchable={true}
      // changeHandler((prev) => ({ ...prev, [id]: e.value }))
      onChange={(e) => {
        // console.log("e ",e);
        const arrValues = e.map((ele) => ele.value);
        // console.log("arrValues ",arrValues);
        const copiedArr = e.map((ele) => {
          return {
            id: ele.value,
            name: ele.label,
          };
        });
        // console.log("copiedArr ", copiedArr);
        changeHandler((prev) => ({ ...prev, copied_managers: copiedArr }));
      }}
      isMulti
      closeMenuOnSelect={false}
      components={animatedComponents}
      isLoading={isLoading}
      isClearable={true}
      name=""
      options={options}
      //  value={value}
      className={`  ${
        isError ? "border-red-400" : "border-[#aaaaaad6]"
      }  focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]`}
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
