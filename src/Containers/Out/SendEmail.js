import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Aux from '../../hoc/Auxiliar';
import Input from '../../Components/UI/Form/Input';

import axios from '../../axios-connection';


export default class SendEmail extends Component {

  state = {
    email: {
      elementType: 'input',
      valid: false,
      touched: false, 
      value: '',
      elementConfig: {
        type: 'email',
        placeholder: 'Enter your email'
      },
      validation: {
        validmail: {
          valid: true,
          errorMessage: 'Email not valid.'
        },
        required: {
          valid: false,
          errorMessage: 'Email required.'
        },
        notExists: {
          valid: true,
          errorMessage: 'There is not a user with this e-mail address.'
        }
      }
    }
  }

  changedValueEmail = ( event ) => {
    let newValue = event.target.value;
    let email = { ...this.state.email };

    email.value = newValue;
    email.touched = true;

    if( newValue !== '' ) {
      email.valid = true;
      email.validation.required.valid = true;
    } else {
      email.valid = false;
      email.validation.required.valid = false;
    }    
    
    this.setState({ email });
  }

  onClickEmail = () => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = { ...this.state.email };

    if( regex.test(String(email.value).toLowerCase()) ) {
      axios.post('/reset/resetPassword', { email: email.value })
      .then( res => {
        this.setState({ user: res.data })
        this.props.getUser( res.data )     
      })
      .catch( error => {
        let email = { ...this.state.email };
        email.validation.notExists.valid = false;
        email.valid = false;
        this.setState({ email })
      })
    } else {
      email.valid = false;
      email.validation.validmail.valid = false;
      this.setState({ email });
    }
  }

  render() {

    let btnClasses = ['btn'];
    if( !this.state.email.valid )
      btnClasses.push('btn-disabled');

    return (
      <Aux>        
        <div className='reset-header'>
          <FontAwesomeIcon icon={faUserCircle} className='icon-reset'/> 
        </div>
        <div className='reset-password-container'>
          <div className='reset-form-container'>
            <Input 
              inputtype={this.state.email.elementType} 
              elementConfig={this.state.email.elementConfig} 
              value={this.state.email.value} 
              changed={ e => this.changedValueEmail(e) }
              valid={this.state.email.valid}
              shouldValidate={this.state.email.validation}
              touched={this.state.email.touched}
              />
              <div className='reset-password-buttons'>
                <Link className='btn-link btn-link-login' to='/login'>Cancel</Link>
                <button className={btnClasses.join(' ')} disabled={ !this.state.email.valid } onClick={this.onClickEmail}>Send mail</button>
              </div>
          </div>
          { (Object.keys(this.props.user).length > 0)? 
            <div className='reset-verify'>
              <p className='reset-verify-name'>Hi, {this.props.user.name}!</p>
              <p>Verify your e-mail! We sent a code to reset password.<br></br>
                 Click next button to change password.
              </p>
              <Link className='btn btn-continue' to='reset-password/change-password'>Introduce the code <FontAwesomeIcon icon={faArrowRight} className='icon-arrow'/></Link>
            </div> : null }
        </div>
      </Aux>
    )
  }
}
