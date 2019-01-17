import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../axios-connection';
import * as actionsCreators from '../store/actions/index';
import Form from '../Components/UI/Form/Form';

class Login extends Component {

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
          }
        }
      },
      password: {
        elementType: 'input',
        valid: true,
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
          auth: {
            valid: true,
            errorMessage: 'There is an error with your authentication, make sure your email and password are correct.'
          }
        }  
      },
    },
    formName: 'login'
  }

  componentWillMount() {
    let state = {...this.state};
    this.props.onUpdateFormState(state);
  }

  componentWillUpdate( nextProps ) {
    if ( nextProps.formState.formElements.password.value && nextProps.formState.formElements.password.valid ) {
      let props = { ...nextProps };
      this.onLogin( props.formState );
    }    
  }

  shouldComponentUpdate( nextProps ) {
    if ( nextProps.formState.formName === 'login') {
      return true;
    }
    return false;
  }

  onLogin = ( form ) => {    
    let user = {
      username: form.formElements.username.value,
      password: form.formElements.password.value
    }

    axios.post( '/user/getByAuth', user )
    .then( data => {
      if ( data.data ) {     
        this.props.onUpdateFormState({});
        data.data.isAuth = true;
        this.props.onLogin( data.data );
      } else {
        let formError = { ...form };
        formError.formElements.password.valid = false;
        formError.formElements.password.value = '';
        formError.formElements.password.validation.auth.valid = false;
        this.props.onUpdateFormState(formError);
      }
    })

  }

  render() {
    console.log('render login')
    return (
      <div className='login-container'>
        <div className='form-container'>
          <Form />
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
    onLogin: payload => { dispatch(actionsCreators.login( payload )) },
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Login);