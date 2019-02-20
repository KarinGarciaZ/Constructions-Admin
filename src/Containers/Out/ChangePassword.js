import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import axios from '../../axios-connection';
import Form from '../../Components/UI/Form/Form';

class ChangePassword extends Component {

  state = {    
    formElements: {  
      code: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'number',
          placeholder: 'Enter code we sent you'
        },
        validation: {
          required: {
            valid: false,
            errorMessage: 'Code required.'
          },
          notExists: {
            valid: true,
            errorMessage: 'This code in not correct.'
          },
          maxLength: {
            valid: true,
            value: 4,
            errorMessage: 'Code is lower than 5.'
          }
        }
      }, 
      password: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'password',
          placeholder: 'New Password'
        },
        validation: {
          required: {
            valid: false,
            errorMessage: 'This field is required.'
          },
          maxLength: {
            valid: true,
            value: 16,
            errorMessage: 'Max length is 16 characters.'
          },
          minLength: {
            valid: true,
            value: 6,
            errorMessage: 'Min length is 6 characters.'
          }          
        }
      },
      confirmPassword: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm New Password'
        },
        validation: { 
          required: {
            valid: false,
            errorMessage: 'This field is required.'
          },
          passwordMatch: {
            valid: true,
            errorMessage: 'Password doesn´t match.'
          },
          minLength: {
            valid: true,
            value: 6,
            errorMessage: 'Min length is 6 characters.'
          }   
        }
      }
    },
    formName: 'changePassword',
    isLoading: true
  }

  componentWillMount() {
    if( !this.props.user.name )
      this.onCancel()

    let form = { ...this.state }
    this.props.onUpdateFormState( form );
  }

  shouldComponentUpdate( nextProps ) {
    if ( nextProps.formState.formName === 'changePassword' && !nextProps.formState.isLoading )
      return true;
    return false;
  }

  componentWillUpdate( nextProps ) {
    let props = { ...nextProps };
    if ( nextProps.formState.formElements.password.valid && nextProps.formState.formElements.code.valid) { 
      if ( nextProps.formState.formElements.password.value === nextProps.formState.formElements.confirmPassword.value )     
        this.changePassword( props );
      else {
        props.formState.formElements.confirmPassword.validation.passwordMatch.valid = false;
        props.formState.formElements.confirmPassword.valid = false;
        this.props.onUpdateFormState( props.formState );
      }
    }
  }

  changePassword = ( props ) => {
    let code =  props.formState.formElements.code;
    let user = { ...this.props.user };
    let password = props.formState.formElements.password.value;

    axios.post('/reset/verifyCode', { code: +code.value, userId: user.id, password })
    .then( res => {
      this.onCancel();
    })
    .catch( error => {
      props.formState.formElements.code.validation.notExists.valid = false;
      props.formState.formElements.code.valid = false;   
      let errorProps = { ...props.formState }     
      this.props.onUpdateFormState( errorProps );
    })  
  }

  onCancel = () => {
    this.props.onUpdateFormState( {} );
    this.props.history.push('/login');
  }

  render() {    

    return (
      <div className='change-password-cont'>
        <div className='change-password-cont__header'>
          <FontAwesomeIcon icon={faUserCircle} className='icon-reset'/>
          <p>{this.props.user.name}</p>
        </div>
        <div className='form-container'>
          <div className='elements-change-password'>          
            <FontAwesomeIcon icon={faLock} className='icon-reset'/>
            <Form onCancel={this.onCancel} cancelButton={true}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formState: state.formState.form
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(ChangePassword);