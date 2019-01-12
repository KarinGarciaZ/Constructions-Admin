import React from 'react';

const input = ( props ) => {
  let imputElement = null;
  let inputClasses = []
  let arrayErrorMessages = [];

  if ( !props.valid && props.shouldValidate && props.touched ){
    let validationKeys = [];
    for ( let validateField in props.shouldValidate )
      validationKeys.push(validateField);

    let validationsKeyWithErrors = validationKeys.filter( key => {        
      if ( !props.shouldValidate[key].valid )
        return true;
      return false;
    })

    console.log('validationsKeyWithErrors: ', validationsKeyWithErrors);

    arrayErrorMessages = validationsKeyWithErrors.map( key => {
      return <p key={key} className='input-error'>* {props.shouldValidate[key].errorMessage}</p>
    })

    inputClasses.push('invalid');
  }

  switch( props.inputtype ) {
    case 'input':
      inputClasses.push('input')
      imputElement = <input className={ inputClasses.join(' ') } { ...props.elementConfig } value={ props.value } onChange={props.changed}/>
      break;
    case 'radio':
      imputElement = <input type='radio' name={props.name} value={ props.value } onClick={props.clicked}/>
      break;
    case 'textarea':
      imputElement = <textarea className={ inputClasses.join(' ') } { ...props.elementConfig } value={ props.value } onChange={props.changed}/>
      break;
    default:
      imputElement = <input className={ inputClasses.join(' ') } { ...props.elementConfig } value={ props.value } onChange={props.changed}/>
  }

  return (
    <div className='input-container'>
      <label className='label'>{props.elementConfig.placeholder}:</label>
      {imputElement}
      {arrayErrorMessages}
    </div>
  );

}

export default input;