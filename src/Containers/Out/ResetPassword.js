import React, { Component } from 'react';

import Footer from '../../Components/Layout/Footer';
import Aux from '../../hoc/Auxiliar';
import {Switch, Route } from 'react-router-dom';
import SendEmail from './SendEmail';
import ChangePassword from './ChangePassword';


export default class ResetPassword extends Component {

  state = {
    user: {}
  }

  getUser = ( user ) => {
    this.setState({user})
  }

  render() {
    let currentPath = this.props.match.path

    return (
      <Aux>        
        <Switch>     
          <Route path={currentPath + '/change-password'} component={ () => <ChangePassword user={this.state.user}/>}/>
          <Route path={currentPath} component={ () => <SendEmail getUser={this.getUser} user={this.state.user}/> }/>
        </Switch>
        <Footer />
      </Aux>
    )
  }
}
