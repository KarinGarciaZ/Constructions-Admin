import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const serviceModal = (props) => {
  return (
    <div className='modal-service'>
      <FontAwesomeIcon icon={faTimes} className='modal__close' onClick={props.closeModal}/>
      <p>{props.service.name}</p>
      <button className='btn btn-edit' onClick={props.closeModal}>Close</button>
    </div>
  )
}

export default serviceModal