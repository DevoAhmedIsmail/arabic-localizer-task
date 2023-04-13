import React from 'react'

const ErrorSpan = ({text}) => {
  return (
    <span className='absolute -bottom-4 text-xs text-red-400'>{text}</span>
  )
}

export default ErrorSpan