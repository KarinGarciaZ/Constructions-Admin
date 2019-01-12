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

    let state = { ...this.state }
    this.props.onUpdateFormState( state.formElements );
  }

  componentWillReceiveProps( nextProps ) {
    if (nextProps.formState !== this.state.formElements) {
      this.setState({ formElements: nextProps.formState })
    }
  }

  saveUser = () => {
    console.log('grabar')
  }
  
  checkPasswords = () => {
    console.log(this.state)
    if ( this.state.formElements.password.value !== this.state.formElements.confirmPassword.value ) {
      
      console.log('entra')
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
          <Form checkPassword={this.checkPasswords}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formState: state.formState.formElements
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Add a new User') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(AddUser);