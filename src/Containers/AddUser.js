import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../store/actions/index';
import Form from '../Components/UI/Form/Form';
import axios from '../axios-connection';

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
        valid: false,
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
          placeholder: 'Confirm Password'
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
    }
  }

  componentWillMount() {
    this.props.onChangeTitle();
    this.setUserForm();
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.formState.formElements.confirmPassword.valid )
      if ( nextProps.formState.formElements.password.value === nextProps.formState.formElements.confirmPassword.value ) {
        let props = { ...nextProps };
        this.saveUser(props);
      } else {
        let newProps = { ...nextProps };
        newProps.formState.formElements.confirmPassword.validation.passwordMatch.valid = false;
        newProps.formState.formElements.confirmPassword.valid = false;
        this.props.onUpdateFormState( newProps.formState.formElements );
      }
  }

  setUserForm = () => {
    let state = { ...this.state }
    this.props.onUpdateFormState( state.formElements );
  }

  saveUser = ( props ) => {
    let newUser = {
      username: props.formState.formElements.username.value,
      name: props.formState.formElements.name.value,
      email: props.formState.formElements.email.value,
      phoneNumber: props.formState.formElements.phoneNumber.value,
      password: props.formState.formElements.password.value
    }
    axios.post( '/user', newUser )
    .then( data => {
      console.log('data: ', data);
      this.props.history.push('/')
    })
    .catch( error => {
      console.log('error: ', error);
    })
  }

  onCancel = () => {
    this.props.history.push('/');
  }

  render() {
    console.log('Render AddUser');
    return (
      <div className='add-user-container'>
        <div className='form-container'>
          <Form onCancel={this.onCancel} />
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