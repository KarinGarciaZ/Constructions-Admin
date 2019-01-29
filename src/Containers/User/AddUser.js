import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import Form from '../../Components/UI/Form/Form';
import axios from '../../axios-connection';

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
          },
          unique: {
            valid: true,
            errorMessage: 'This username already exist.'
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
    },
    formName: 'addUser'
  }

  componentWillMount() {
    this.props.onChangeTitle();
    this.props.onUpdateFormState({});
    
    let state = { ...this.state }
    this.props.onUpdateFormState( state );
  }

  shouldComponentUpdate( nextProps ) {
    if ( nextProps.formState.formName === 'addUser' )
      return true;
    return false;
  }

  componentWillUpdate( nextProps ) {
    if ( nextProps.formState.formElements.confirmPassword.valid && nextProps.formState.formElements.email.valid && nextProps.formState.formElements.username.valid )
      if ( nextProps.formState.formElements.password.value === nextProps.formState.formElements.confirmPassword.value ) {
        let props = { ...nextProps };
        this.saveUser(props.formState);
      } else {
        let newProps = { ...nextProps };
        newProps.formState.formElements.confirmPassword.validation.passwordMatch.valid = false;
        newProps.formState.formElements.confirmPassword.valid = false;
        this.props.onUpdateFormState( newProps.formState );
    }
  }

  saveUser = ( props ) => {
    let newUser = {
      username: props.formElements.username.value,
      name: props.formElements.name.value,
      email: props.formElements.email.value,
      phoneNumber: props.formElements.phoneNumber.value,
      password: props.formElements.password.value
    }

    let TOKEN = localStorage.getItem('userToken');
    axios.post( '/user', newUser, {headers: { 'Authorization': 'Bearer ' + TOKEN}})
    .then( data => {
      this.props.onUpdateFormState( {} );
      this.props.history.push('/');
    })
    .catch( error => {
      console.log(error.response)
      if( error.response.status === 403 ){
        this.props.onUpdateFormState( {} );
      } else {
        error.response.data.errors.forEach(element => {
          if ( element.path === 'username' ) {
            props.formElements.username.validation.unique.valid = false;
            props.formElements.username.valid = false;
          }
          if ( element.path === 'email' ) {
            if ( element.type === 'Validation error' ) {
              props.formElements.email.validation.isEmail.valid = false;  
              props.formElements.email.validation.unique.valid = true; 
            }
            if ( element.type === 'unique violation' ) {
              props.formElements.email.validation.unique.valid = false; 
              props.formElements.email.validation.isEmail.valid = true;  
            } 
            props.formElements.email.valid = false;      
          }
        });     
        let errorProps = { ...props };
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
      <div className='add-user-container'>
        <div className='form-container'>
          <Form onCancel={this.onCancel} cancelButton={true}/>
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
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Add a new User') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(AddUser);