import React from 'react';

const input = ( props ) => {
  let imputElement = null;
  let inputClasses = []
  let inputError = null;

  if ( !props.valid && props.shouldValidate && props.touched ){
    inputError = (<p className='input-error'>Please enter a valid {props.elementConfig.placeholder}</p>)
    inputClasses.push('invalid');
  }
  // if ( props.valid && props.shouldValidate && props.touched ) 
  //   inputClasses.push('valid');

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
      {inputError}
    </div>
  );

}

export default input;