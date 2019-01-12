import React, { Component } from 'react';
import Input from './Input';
import { connect } from 'react-redux';
import * as actionsCreators from '../../../store/actions/index';

class Form extends Component {

  state = {
    formElements: {}
  }

  componentWillReceiveProps( nextProps ) {
    if (nextProps.formState.formElements !== this.state.formElements) {
      this.setState({ formElements: nextProps.formState.formElements })
    }
  }

  onSubmitForm = ( event ) => {
    event.preventDefault();

    let state = { ...this.state };
    this.props.onUpdateFormState( state.formElements );
  }

  checkValidity = ( value, validation ) => {
    let valid = [];

    if( validation.required ){
      valid.push( value.trim() !== '' )
    }

    if( validation.minLength ){
      valid.push( value.length >= validation.minLength )
    }

    if( validation.maxLength ){
      valid.push( value.length <= validation.maxLength )
    }

    for( let bool of valid )
      if ( !bool ) return false;
    return true;
  }

  changedValueInput = ( id, event ) => {
    let formElement = { ...this.state.formElements }
    let values = { ...formElement[id] }
    values.value = event.target.value;
    values.valid = this.checkValidity( values.value, values.validation )
    values.touched = true
    formElement[id] = values;
    this.setState({ formElements: formElement })
  }

  render() {
    console.log('render form');
    let buttonDisabled = false;
    let formElementsForHTML = [];    
    for ( let key in this.state.formElements ) {
      formElementsForHTML.push( {
        id: key,
        config: this.state.formElements[key]
      })
    }

    for( let element of formElementsForHTML ){
      if ( !element.config.valid )
        buttonDisabled = true;
    }

    let form = (
      <form onSubmit={this.onSubmitForm} className='form'>      
        {formElementsForHTML.map( formElementForHTML => {
          return <Input 
            key={formElementForHTML.id} 
            label={formElementForHTML.id}
            inputtype={formElementForHTML.config.elementType} 
            elementConfig={formElementForHTML.config.elementConfig} 
            value={formElementForHTML.config.value} 
            changed={( event ) => this.changedValueInput(formElementForHTML.id, event)}
            valid={formElementForHTML.config.valid}
            shouldValidate={formElementForHTML.config.validation}
            touched={formElementForHTML.config.touched}
            />
        })}
        <div className='form-buttons'>
          <button className='btn btn-cancel' type='button' disabled={buttonDisabled}>cancel</button>
          <button className='btn' disabled={buttonDisabled}>Save</button>
        </div>
      </form>
    );

    return (
      <div>
        {form}        
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

const mapStateToProps = state => {
  return {
    formState: state.formState
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
