import React from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

const Pagination = ({ paginationInfo, pageHandler, pageArrowHandler }) => {
  // const {hasMorePages,currentPage,hasMorePages,total} = paginationInfo
  console.log("pagination page", paginationInfo);

  return (
    <div className="flex justify-center items-center gap-1">
      <button
        disabled={paginationInfo.currentPage === 1}
        className="cursor-pointer"
        onClick={() => pageArrowHandler(-1)}
      >
        <BsArrowLeftSquareFill
          className={`${
            paginationInfo.currentPage === 1
              ? "text-[#3087c552]"
              : "text-[#3086c5]"
          } w-10 h-10`}
        />
      </button>
      {[...Array(Math.ceil(paginationInfo.total / 16))].map((e, index) => (
        <span
          key={index}
          className={`cursor-pointer ${
            paginationInfo.currentPage === index + 1
              ? "bg-[#3086c5]"
              : "bg-[#3087c5cb]"
          }  text-white px-4 py-2 `}
          onClick={() => pageHandler(index + 1)}
        >
          {index + 1}
        </span>
      ))}
      <button
        disabled={
          paginationInfo.currentPage === Math.ceil(paginationInfo.total / 16)
        }
        className="cursor-pointer"
        onClick={() => paginationInfo.currentPage === Math.ceil(paginationInfo.total/16) ? pageArrowHandler(1): ""}
      >
        <BsArrowRightSquareFill
          className={`${
            paginationInfo.hasMorePages ? "text-[#3086c5]" : "text-[#3087c552]"
          }  w-10 h-10`}
        />
      </button>
    </div>
  );
};

export default Pagination;
