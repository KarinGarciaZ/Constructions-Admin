import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const modal = (props) => {
  return (
    <div className='modal'>
      <FontAwesomeIcon icon={faTimes} className='modal__close' onClick={props.closeModal}/>
      <p className='modal__title'>Are you sure you want to delete it? {props.ids}</p>
      <button className='btn btn-cancel' onClick={props.deleteConst}>Yes</button>
      <button className='btn btn-edit' onClick={props.closeModal}>No</button>
    </div>
  )
}

export default modal