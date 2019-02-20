import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import Aux from '../../hoc/Auxiliar';
import Input from '../../Components/UI/Form/Input';

import axios from '../../axios-connection';

export default class ChangePassword extends Component {

  state = {
    code: {
      elementType: 'input',
      valid: false,
      touched: false, 
      value: '',
      elementConfig: {
        type: 'number',
        placeholder: 'Enter code we sent you'
      },
      validation: {
        required: {
          valid: false,
          errorMessage: 'Code required.'
        },
        notExists: {
          valid: true,
          errorMessage: 'This code in not correct.'
        }
      }
    },
    showCode: true,

  }

  changedCode = ( event ) => {
    let newValue = event.target.value;
    let code = { ...this.state.code };

    code.value = newValue;
    code.touched = true;

    if( newValue !== '' ) {
      code.valid = true;
      code.validation.required.valid = true;
    } else {
      code.valid = false;
      code.validation.required.valid = false;
    }    
    
    this.setState({ code });
  }

  onClickCode = () => {
    let code = { ...this.state.code };
    let user = { ...this.props.user };

    axios.post('/reset/verifyCode', { code: +code.value, userId: user.id })
    .then( res => {
      console.log('1')
      this.setState({ showCode: false}) 
    })
    .catch( error => {
      console.log('2')
      let code = { ...this.state.code };
      code.validation.notExists.valid = false;
      code.valid = false;
      this.setState({ code })
    })  
  }

  render() {

    let btnClasses = ['btn'];
    if( !this.state.code.valid )
      btnClasses.push('btn-disabled');

    let showInForm = <Aux>
      <Input 
        inputtype={this.state.code.elementType} 
        elementConfig={this.state.code.elementConfig} 
        value={this.state.code.value} 
        changed={ e => this.changedCode(e) }
        valid={this.state.code.valid}
        shouldValidate={this.state.code.validation}
        touched={this.state.code.touched}
        />
      <div className='reset-password-buttons'>
        <button className={btnClasses.join(' ')} disabled={ !this.state.code.valid } onClick={this.onClickCode}>Set new password</button>        
        <Link className='btn-link btn-link-login' to='/login'>Cancel</Link>
      </div>
    </Aux>

    if( !this.state.showCode ) {
      showInForm = null
    }
    

    return (
      <div className='change-password-cont'>
        <div className='change-password-cont__header'>
          <FontAwesomeIcon icon={faUserCircle} className='icon-reset'/>
          <p>{this.props.user.name}</p>
        </div>
        <div className='form-container'>
          <div className='elements-change-password'>          
            <FontAwesomeIcon icon={faLock} className='icon-reset'/>
            {showInForm}
          </div>
        </div>
      </div>
    )
  }
}
