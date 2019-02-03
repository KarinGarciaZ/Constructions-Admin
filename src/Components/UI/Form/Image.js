import React from 'react'

 const Image = props => {
  return (
    <img src={props.url} className={props.classes} onClick={props.clicked} alt='construction-img'></img>
  )
}

export default Image;