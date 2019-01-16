import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';

class EditOwnUser extends Component {

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
      }
    }
  }

  componentDidMount() {
    this.props.onChangeTitle();
  }

  componentWillReceiveProps( nextProps ) {
    console.log('nextProps: ', nextProps);
    let userForm = { ...this.state.formElements };
    userForm.username.value = nextProps.username;
    userForm.name.value = nextProps.name;
    userForm.email.value = nextProps.email;
    userForm.phoneNumber.value = nextProps.phoneNumber;

    this.props.onUpdateFormState( userForm );

  }
  
  shouldComponentUpdate( nextProps, nextState ) {
    if ( nextProps.formState.formElements === this.props.formState.formElements )   
      return false;
    return true;
  }

  render() {
    console.log('render edit user');
    return (
      <div>
        EditOwnUser
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formState: state.formState,
    userInfo: state.auth.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Edit your profile') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditOwnUser);