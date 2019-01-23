import React from 'react';
import spinner from '../../Assets/Images/Project/spinner.png'

const loading = () => {
  return (
    <div className='loading-container'>
      <img src={spinner} className='spinner' alt='Loading'/>
    </div>
  )
}

export default loading;
