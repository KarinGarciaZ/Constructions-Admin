import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';

import ResetPassword from '../../Containers/Out/ResetPassword';
import Login from '../../Containers/Out/Login';

class OutRoutes extends Component {
  render() {
    return (
      <Switch>     
        <Route path="/reset-password" component={ResetPassword}/>
        <Route path="/" component={Login}/>
      </Switch> 
    )
  }
}

export default OutRoutes