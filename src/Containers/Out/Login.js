import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-connection';
import * as actionsCreators from '../../store/actions';
import Form from '../../Components/UI/Form/Form';
import Aux from '../../hoc/Auxiliar';

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
    
    this.props.onChangeTitle();
    this.props.onUpdateFormState({});
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
      localStorage.setItem('isLogged', data.data.isLogged);
      if ( data.data.userInfo ) {     
        this.props.onUpdateFormState({});

        let userInfo = {
          username: data.data.userInfo.username,
          name: data.data.userInfo.name,
          email: data.data.userInfo.email,
          phoneNumber: data.data.userInfo.phoneNumber,
          isAuth: true
        }

        this.props.onLogin( userInfo );
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
    return (
      <Aux>
        <div className='login-container'></div>
        
        <div className='form-container-login'>
          <Form forgotPassword={true} />
        </div>
      </Aux>      
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
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('') ),
    onLogin: payload => { dispatch(actionsCreators.login( payload )) },
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Login);