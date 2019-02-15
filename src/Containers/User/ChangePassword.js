import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import axios from '../../axios-connection';
import Form from '../../Components/UI/Form/Form';

class ChangePassword extends Component {

  state = {
    formElements: {  
      currentPassword: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'password',
          placeholder: 'Current Password'
        },
        validation: {
          required: {
            valid: false,
            errorMessage: 'This field is required.'
          },
          validPassword: {
            valid: true,
            errorMessage: 'This password is not valid.'
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
    this.props.onChangeTitle();
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
    if ( nextProps.formState.formElements.currentPassword.valid) { 
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
    let userInfo = {
      currentPassword: props.formState.formElements.currentPassword.value,
      newPassword: props.formState.formElements.password.value
    }
    
    axios.put( '/user/changePassword', userInfo)
    .then( () => {
      this.props.onUpdateFormState( {} );
      this.props.history.push('/');
    })
    .catch( err => {
      if (err.response.data === 'Invalid password') {
        props.formState.formElements.currentPassword.validation.validPassword.valid = false;
        props.formState.formElements.currentPassword.valid = false;   
        let errorProps = { ...props.formState }     
        this.props.onUpdateFormState( errorProps );
      }
    })
  }

  onCancel = () => {
    this.props.onUpdateFormState( {} );
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='change-password-container'>
        <div className='form-container'>
          <Form onCancel={this.onCancel} cancelButton={true}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formState: state.formState.form,
    userInfo: state.auth.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Change your password') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(ChangePassword);