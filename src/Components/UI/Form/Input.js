import React from 'react';

const input = ( props ) => {
  let imputElement = null;
  let inputClasses = []
  let arrayErrorMessages = [];
  let gridClasses = '';

  if ( !props.valid && props.shouldValidate && props.touched ){
    let validationKeys = [];
    for ( let validateField in props.shouldValidate )
      validationKeys.push(validateField);

    let validationsKeyWithErrors = validationKeys.filter( key => {        
      if ( !props.shouldValidate[key].valid )
        return true;
      return false;
    })

    arrayErrorMessages = validationsKeyWithErrors.map( key => {
      return <p key={key} className='input-error'>* {props.shouldValidate[key].errorMessage}</p>
    })

    inputClasses.push('invalid');
  }

  switch( props.inputtype ) {
    case 'input':
      inputClasses.push('input')
      gridClasses = ''
      imputElement = <input className={ inputClasses.join(' ') } { ...props.elementConfig } value={ props.value } onChange={props.changed}/>      
      break;
    case 'select':
      inputClasses.push('input')
      inputClasses.push('select')
      gridClasses = ''
      imputElement = <select className={ inputClasses.join(' ') } onChange={ props.changedSelect }>
        { props.options.map( option => {
          return (
            <option className='option' value={option} key={option}>
              {option}
            </option>
          )
        }) }
      </select>
      break;
    case 'textarea':
      inputClasses.push('textarea')
      gridClasses = 'textarea-container'
      imputElement = <textarea className={ inputClasses.join(' ') } { ...props.elementConfig } value={ props.value } onChange={props.changed}/>
      break;
    default:
      imputElement = <input className={ inputClasses.join(' ') } { ...props.elementConfig } value={ props.value } onChange={props.changed}/>
  }

  return (
    <div className={gridClasses}>
      <label className='label'>{props.elementConfig.placeholder}:</label>
      {imputElement}
      {arrayErrorMessages}
    </div>
  );

}

export default input;