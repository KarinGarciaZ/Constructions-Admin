import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../store/actions/index';
import axios from '../axios-connection';
import Form from '../Components/UI/Form/Form';

class EditOwnUser extends Component {

  state = {
    formElements: {
      username: {
        elementType: 'input',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
        },
        validation: {
          required: {
            valid: false,
            errorMessage: 'This field is required.'
          },
          maxLength: {
            valid: true,
            value: 100,
            errorMessage: 'Max length is 100 characters.'
          },
          unique: {
            valid: true,
            errorMessage: 'This username already exist.'
          }
        }
      },
      name: {
        elementType: 'input',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        validation: {
          required: {
            valid: false,
            errorMessage: 'This field is required.'
          },
          maxLength: {
            valid: true,
            value: 100,
            errorMessage: 'Max length is 100 characters.'
          }
        }
      },
      email: {
        elementType: 'input',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        validation: {
          required: {
            valid: false,
            errorMessage: 'This field is required.'
          },
          maxLength: {
            valid: true,
            value: 200,
            errorMessage: 'Max length is 200 characters.'
          },
          unique: {
            valid: true,
            errorMessage: 'This email is used by another user.'
          },
          isEmail: {
            valid: true,
            errorMessage: 'This does not seem to be a valid email.'
          }
        }
      },
      phoneNumber: {
        elementType: 'input',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone Number'
        },
        validation: { }
      }
    },
    formName: 'editUser',
    loadingData: true
  }

  componentWillMount() {
    this.props.onChangeTitle();

    let userForm = { ...this.state }
    userForm.formElements.username.value = this.props.userInfo.username;
    userForm.formElements.name.value = this.props.userInfo.name;
    userForm.formElements.email.value = this.props.userInfo.email;
    userForm.formElements.phoneNumber.value = this.props.userInfo.phoneNumber;
    this.props.onUpdateFormState( userForm );
  }

  componentWillUpdate( nextProps ) {
    if ( nextProps.formState.formElements.email.valid && nextProps.formState.formElements.username ) 
      if ( !nextProps.formState.loadingData ) {
        let formProps = { ...nextProps.formState };
        this.updateUser( formProps );
    }
  }
  
  shouldComponentUpdate( nextProps ) {
    if ( nextProps.formState.formName === 'editUser' )
      return true;
    return false;    
  }

  updateUser = ( formProps ) => {
    let newUser = {
      id: this.props.userInfo.id,
      username: formProps.formElements.username.value,
      name: formProps.formElements.name.value,
      phoneNumber: formProps.formElements.phoneNumber.value,
      email: formProps.formElements.email.value
    }

    let cachedHits = localStorage.getItem('userToken');
    axios.put( '/user', newUser, {headers: {authorization: cachedHits}})
    .then( data => {
      let newUserInfo = { ...this.props.userInfo };
      newUserInfo.username = newUser.username;
      newUserInfo.name = newUser.name;
      newUserInfo.email = newUser.email;
      newUserInfo.phoneNumber = newUser.phoneNumber;

      this.props.onUpdateFormState( {} );
      this.props.onSetUserData(newUserInfo);
      this.props.history.push('/');
    })
    .catch( error => {
      error.response.data.errors.forEach(element => {
        if ( element.path === 'username' ) {
          formProps.formElements.username.validation.unique.valid = false;
          formProps.formElements.username.valid = false;
        }
        if ( element.path === 'email' ) {
          if ( element.type === 'Validation error' ) {
            formProps.formElements.email.validation.isEmail.valid = false;  
            formProps.formElements.email.validation.unique.valid = true; 
          }
          if ( element.type === 'unique violation' ) {
            formProps.formElements.email.validation.unique.valid = false; 
            formProps.formElements.email.validation.isEmail.valid = true;  
          } 
          formProps.formElements.email.valid = false;      
        }
      });
      formProps.loadingData = true;  
      let errorProps = { ...formProps };
      this.props.onUpdateFormState( errorProps );
    })
  }

  onCancel = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='edit-user-container'>
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
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Edit your profile') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) ),
    onSetUserData: payload => { dispatch(actionsCreators.login( payload )) }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditOwnUser);