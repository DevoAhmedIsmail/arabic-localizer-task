import React from "react";

const Button = ({ text, color, submitBtn,fontSize }) => {
  return (
    <button
      
      className={` text-white w-[94px] h-[27px] rounded-[5px] font-[Roboto] `}
      style={{ backgroundColor: `${color}`,fontSize }}
      
    >
      {text}
    </button>
  );
};

export default Button;
