import React from 'react'

 const Image = props => {
  return (
    <img src={props.url} className='image-container-img' alt='construction-img'></img>
  )
}

export default Image;