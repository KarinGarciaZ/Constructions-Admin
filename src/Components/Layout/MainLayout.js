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

class MainLayout extends Component {

  render() {

    return (
      <div className='main-layout'>
        <Switch>
          <Route path="/construction/:id" component={Construction}/>
          <Route path="/editConstruction/:id" component={EditConstruction}/>
          <Route path="/construction" component={Construction}/>
          <Route path="/editConstruction" component={EditConstruction}/>
          <Route path="/allConstructions" component={AllConstructions}/>
          <Route path="/createConstruction" component={CreateConstruction}/>
          <Route path="/editOwnUser" component={EditOwnUser}/>
          <Route path="/changePassword" component={ChangePassword}/>
          <Route path="/addUser" component={AddUser}/>
          <Route path="/types" component={Types}/>
          <Route path="/" component={Home}/>
        </Switch> 
      </div>
    )
  }
}

export default MainLayout;