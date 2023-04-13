import React from "react";

const Badge = ({ color, text, top, right }, props) => {
  return (
    <p
      className={`absolute  text-white w-[15px] h-[15px] rounded-full text-[8px] font-[Lato] leading-[15px] text-center `}
      style={{ backgroundColor: `${color}`, top: `${top}`, right: `${right}` }}
    >
      {text}
    </p>
  );
};

export default Badge;
