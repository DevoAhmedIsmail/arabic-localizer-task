import React from 'react';
import spinner from '../assets/Spinner-2.gif'
import spinner2 from '../assets/VAyR.gif'

const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center mt-16'>
        <img src={spinner2} alt='Loading ...' className='w-16 h-16' />
    </div>
  )
}

export default LoadingSpinner