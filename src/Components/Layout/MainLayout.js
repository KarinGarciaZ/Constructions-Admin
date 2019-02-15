import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';

import Home from '../../Containers/Home';
import CreateConstruction from '../../Containers/Constructions/CreateConstruction';
import Construction from '../../Containers/Constructions/Construction';
import EditOwnUser from '../../Containers/User/EditOwnUser';
import AddUser from '../../Containers/User/AddUser';
import ChangePassword from '../../Containers/User/ChangePassword';
import EditConstruction from '../../Containers/Constructions/EditConstruction';
import AllConstructions from '../../Containers/Constructions/AllConstructions';
import Types from '../../Containers/Types';
import ResetPassword from '../../Containers/User/ResetPassword';
import NotFound from '../../Containers/NotFound';

class MainLayout extends Component {

  render() {

    return (
      <div className='main-layout'>
        <Switch>
          <Route path="/construction/:id" component={Construction}/>
          <Route path="/edit-construction/:id" component={EditConstruction}/>
          <Route path="/construction" component={Construction}/>
          <Route path="/all-constructions" component={AllConstructions}/>
          <Route path="/create-construction" component={CreateConstruction}/>
          <Route path="/edit-own-user" component={EditOwnUser}/>
          <Route path="/change-password" component={ChangePassword}/>
          <Route path="/add-user" component={AddUser}/>
          <Route path="/types" component={Types}/>          
          <Route path="/reset-password" component={ResetPassword}/>
          <Route path="/not-found" component={NotFound}/>
          <Route path="/" component={Home}/>
        </Switch> 
      </div>
    )
  }
}

export default MainLayout;