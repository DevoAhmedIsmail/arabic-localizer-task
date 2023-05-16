import React from "react";

const Button = ({ text, color, submitBtn,fontSize, disable }) => {
  return (
    <button
      disabled={disable}
      className={` text-white w-[94px] h-[27px] rounded-[5px] font-[Roboto] ${disable && "opacity-50"} `}
      style={{ backgroundColor: `${color}`,fontSize }}
    >
      {text}
    </button>
  );
};

export default Button;
