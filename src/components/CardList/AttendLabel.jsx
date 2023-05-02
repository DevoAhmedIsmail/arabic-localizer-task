import React from "react";

const AttendLabel = ({ text }) => {
  let labelStyle = {};

  if (text === "Weekend") {
    labelStyle = {
      backgroundColor: "#2764ac29",
      color: "#2764ac",
    };
  } else if (text === "Absent") {
    labelStyle = {
      backgroundColor: "#ff6a6a29",
      color: "#ff6a6a",
    };
  } else if (text === "Present") {
    labelStyle = {
      backgroundColor: "#27b40c29",
      color: "#27b40c",
    };
  }

  return (
    <span
      className="w-[60px] h-[18px] font-[Roboto] text-[11px] leading-[15px] text-center px-[8px] py-[2px]"
      style={labelStyle}
    >
      {text}
    </span>
  );
};

export default AttendLabel;
