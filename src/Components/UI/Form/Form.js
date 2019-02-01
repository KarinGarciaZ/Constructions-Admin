import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from './Input';
import Aux from '../../../hoc/Auxiliar';
import * as actionsCreators from '../../../store/actions/index';
import Image from './Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Form extends Component {

  state = {
    formElements: {},
    formName: '',
    images: []
  }

  componentWillReceiveProps( nextProps ) {
    if (nextProps.formState.formElements !== this.state.formElements) {
      this.setState({ 
        formElements: nextProps.formState.formElements, 
        formName: nextProps.formState.formName 
      })
    }
  }

  onSubmitForm = ( event ) => {
    event.preventDefault();
    let state = { ...this.state };
    this.props.onUpdateFormState( state );
  }

  checkValidity = ( value, validation ) => {
    if ( validation ) {
      let valid = [];

      if( validation.required ){
        let elementValidation = value.trim() !== '';
        valid.push( elementValidation );
        validation.required.valid = elementValidation
      }
  
      if( validation.minLength ){
        let elementValidation = value.length >= validation.minLength.value;
        valid.push( elementValidation );
        validation.minLength.valid = elementValidation;
      }
  
      if( validation.maxLength ){
        let elementValidation = value.length <= validation.maxLength.value;
        valid.push( elementValidation );
        validation.maxLength.valid = elementValidation;
      }
  
      for( let bool of valid )
        if ( !bool ) return [false, validation];
      return [true, validation];
    } else
        return [true, {}];
    
  }

  changedValueInput = ( id, event ) => {

    let formElement = { ...this.state.formElements }
    let values = { ...formElement[id] }
    
    values.value = event.target.value;
    let validationResponse = this.checkValidity( values.value, values.validation );
    values.valid = validationResponse[0];
    values.validation = validationResponse[1];
    values.touched = true
    formElement[id] = values;

    this.setState({ formElements: formElement })
  }

  changedValueSelect = ( id, event ) => {
    let formElements = { ...this.state.formElements }
    formElements[id].value = event.target.value;
    this.setState({ formElements })
  }

  changedValueFiles = ( event ) => {
    let files =  { ...event.target.files }
    let filesArray = []
    let maxSizeImage = 5
    
    for( let key in files ) {
      filesArray.push( files[key] )
    }

    filesArray.forEach( file => {
      if ( file.size < (1024 * 1024 * maxSizeImage) ){
        let reader = new FileReader()      
        reader.readAsDataURL( file )
        reader.onload = ( e ) => {
          let url = e.target.result
          let images = [ ...this.state.images ]
          images.push( {file, url} )
          this.setState({ images }) 
        } 
      } else {
        console.log('too large')
      }   
    })    
  }

  removeFile = ( index ) => {
    let images = [ ...this.state.images ]
    images.splice( index, 1 );
    this.setState({ images })
  }

  render() {
    let buttonDisabled = false;
    let formElementsForHTML = [];
    let btnClasses = ['btn'];
    
    for ( let key in this.state.formElements ) {
      formElementsForHTML.push( {
        id: key,
        config: this.state.formElements[key]
      })
    }

    for( let element of formElementsForHTML ){
      if ( !element.config.valid ) {
        buttonDisabled = true;
        btnClasses.push('btn-disabled')
      }
    }

    let images = [ ...this.state.images ]
    let imagesArray = []
    if ( images.length ) {
      imagesArray = images.map( (image, index) => {
        return (
          <div key={index} className='image-container'>            
            <Image url={image.url}></Image>
            <figcaption className="image-container-caption" onClick={this.removeFile.bind(this, index)}>
              <FontAwesomeIcon icon={faTimes} />
            </figcaption>
          </div>
        )
      })
    }

    let form = (
      <form onSubmit={this.onSubmitForm} className='form'>      
        {formElementsForHTML.map( formElementForHTML => {
          return <Input 
            key={formElementForHTML.id} 
            inputtype={formElementForHTML.config.elementType} 
            elementConfig={formElementForHTML.config.elementConfig} 
            value={formElementForHTML.config.value} 
            changed={( event ) => this.changedValueInput(formElementForHTML.id, event)}
            changedSelect={ event => this.changedValueSelect( formElementForHTML.id, event)}
            changedFiles={ this.changedValueFiles }
            valid={formElementForHTML.config.valid}
            shouldValidate={formElementForHTML.config.validation}
            touched={formElementForHTML.config.touched}
            options={formElementForHTML.config.options}
            />
        })}
        { images.length? 
        <div className='form-images-container'>
          {imagesArray}
        </div> : null }
        <div className='form-buttons'>
          {(this.props.cancelButton)? <button className='btn btn-cancel' type='button' onClick={this.props.onCancel}>cancel</button> : null}
          <button className={btnClasses.join(' ')} disabled={buttonDisabled}>Submit</button>
        </div>
      </form>
    );

    return (
      <Aux>
        {form}        
      </Aux>
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
    formState: state.formState.form
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
