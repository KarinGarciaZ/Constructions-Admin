import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-connection';
import * as actionsCreators from '../../store/actions';
import Form from '../../Components/UI/Form/Form';

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
            errorMessage: 'There is an error with your authentication, make sure your username and password are correct.'
          }
        }  
      },
    },
    formName: 'login'
  }

  componentWillMount() {
    this.props.onChangeTitle('Welcome!')
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

    axios.post( '/auth/login', user )
    .then( data => {
      localStorage.setItem('userToken', data.data.token);
      if ( data.data.userInfo ) {     
        this.props.onUpdateFormState({});
        data.data.userInfo.isAuth = true;
        this.props.onLogin( data.data.userInfo );
      } else {
        let formError = { ...form };
        formError.formElements.password.valid = false;
        formError.formElements.password.value = '';
        formError.formElements.password.validation.auth.valid = false;
        this.props.onUpdateFormState(formError);
      }
    })
    .catch( error => {
      console.log('error: ', error.response);
      let formError = { ...form };
      formError.formElements.password.valid = false;
      formError.formElements.password.value = '';
      formError.formElements.password.validation.auth.valid = false;
      this.props.onUpdateFormState(formError);
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
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) ),
    onChangeTitle: payload => dispatch( actionsCreators.changeHeaderTitle( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Login);