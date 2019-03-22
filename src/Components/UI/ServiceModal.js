import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const serviceModal = (props) => {
  return (
    <div className='modal-service'>
      <FontAwesomeIcon icon={faTimes} className='modal__close' onClick={props.closeModal}/>
      <img src={'http://localhost:3001/' + props.service.image}  alt='ser-img' className='modal-service--img'/>
      <p className='modal-service--title'><strong>{props.service.name}</strong></p>
      <p className='modal-service--description'><strong>{props.service.description}</strong></p>
    </div>
  )
}

export default serviceModal