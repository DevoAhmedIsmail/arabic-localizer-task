import React from 'react'

const ModalTitle = ({text}) => {
  return (
    <div className='my-[10px]'>
        <p className='font-[Roboto] text-[16px] font-bold text-[#23aaeb]'>{text}</p>
        <div className='w-[44px] h-[4px] rounded-[3px] mt-1' style={{backgroundColor: "rgba(35, 170, 235, 0.14)"}}></div>
    </div>
  )
}

export default ModalTitle