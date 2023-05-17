import React from 'react'

const ErrorSpan = ({text}) => {
  return (
    <span className='absolute bottom-[-19px] text-xs text-red-400'>{text}</span>
  )
}

export default ErrorSpan