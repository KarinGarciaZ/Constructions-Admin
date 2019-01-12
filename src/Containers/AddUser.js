import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';

import Form from '../Components/UI/Form/Form';

class AddUser extends Component {

  state = {
    formElements: {
      username: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
        },
        validation: {
          required: true,
          minLength: 1
        }
      },
      name: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        validation: {
          required: true,
          minLength: 1
        }
      },
      email: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        validation: {
          required: true,
          minLength: 4
        }
      },
      phoneNumber: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone Number'
        },
        validation: { }
      },
      password: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        validation: {
          required: true,
          minLength: 6
         }
      },
      confirmPassword: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm Password'
        },
        validation: { 
          required: true,
          minLength: 6
        }
      }
    }
  }

  componentWillMount() {
    this.props.onChangeTitle();
    this.setUserForm();
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.formState.formElements.password.valid )
      if ( nextProps.formState.formElements.password.value === nextProps.formState.formElements.confirmPassword.value ) {
        this.saveUser();
      } else {
        let newProps = { ...nextProps };
        newProps.formState.formElements.password.valid = false;
        newProps.formState.formElements.password.value = '';
        newProps.formState.formElements.confirmPassword.valid = false;
        newProps.formState.formElements.confirmPassword.value = '';
        this.props.onUpdateFormState( newProps.formState.formElements );
      }
  }

  setUserForm = () => {
    let state = { ...this.state }
    this.props.onUpdateFormState( state.formElements );
  }

  saveUser = () => {
    this.props.history.push('/')
  }
  
  checkPasswords = () => {
    if ( this.state.formElements.password.value !== this.state.formElements.confirmPassword.value ) {
      let state = {...this.state};
      state.formElements.password.valid = false;
      state.formElements.confirmPassword.valid = false;

      this.setState({ formElement: state.formElements })
    }      
  }

  render() {
    return (
      <div className='add-user-container'>
        <div className='form-container'>
          <Form/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formState: state.formState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Add a new User') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(AddUser);