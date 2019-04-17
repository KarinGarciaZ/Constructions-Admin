import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const serviceModal = (props) => {

  let paragraphs = null;
  let service = { ...props.service }

  if( service.description ) {
    service.description = service.description.split('\n');

    paragraphs = service.description.map( (description, index) => {
      return(
        <p className='modal-service--description-p' key={index}>{description}</p>
      )
    })
  }    

  return (
    <div className='modal-service'>
      <FontAwesomeIcon icon={faTimes} className='modal__close' onClick={props.closeModal}/>
      <img src={'http://localhost:3001/' + service.image}  alt='ser-img' className='modal-service--img'/>
      <p className='modal-service--title'><strong>{service.name}</strong></p>
      <p className='modal-service--description'>{paragraphs}</p>
    </div>
  )
}

export default serviceModal