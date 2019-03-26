import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';

import axios from '../../axios-connection';

import Home from '../../Containers/Home';

import CreateConstruction from '../../Containers/Constructions/CreateConstruction';
import Construction from '../../Containers/Constructions/Construction';
import EditConstruction from '../../Containers/Constructions/EditConstruction';
import AllConstructions from '../../Containers/Constructions/AllConstructions';

import EditOwnUser from '../../Containers/User/EditOwnUser';
import AddUser from '../../Containers/User/AddUser';
import ChangePassword from '../../Containers/User/ChangePassword';

import AllServices from '../../Containers/Services/AllServices';
import EditService from '../../Containers/Services/EditService';
import CreateService from '../../Containers/Services/CreateService';

import Types from '../../Containers/Types';
import NotFound from '../../Containers/NotFound';

class MainLayout extends Component {

  state = {
    typesLoaded: false
  } 

  componentDidMount() {
    this.validateIfTypesExist();
  }

  validateIfTypesExist = () => {
    axios.get( '/type')
    .then( types => {      
      if( types.data.length ){
        this.setState({ typesLoaded: true })
      }
    })
    .catch( err => console.log( err.response ))
  }

  componentWillUpdate(nextProps, nextState) {
    if( !nextState.typesLoaded )
      this.validateIfTypesExist()
  }

  render() {

    let loadRoutesIfTypesExist = null;

    if( this.state.typesLoaded ) {
      loadRoutesIfTypesExist = <Switch>
        <Route path="/construction/:id" component={Construction}/>
        <Route path="/edit-construction/:id" component={EditConstruction}/>
        <Route path="/all-constructions" component={AllConstructions}/>
        <Route path="/create-construction" component={CreateConstruction}/>
        <Route path="/edit-own-user" component={EditOwnUser}/>
        <Route path="/change-password" component={ChangePassword}/>
        <Route path="/add-user" component={AddUser}/>
        <Route path="/all-services" component={AllServices}/>
        <Route path="/create-service" component={CreateService}/>        
        <Route path="/edit-service/:id" component={EditService}/>
        <Route path="/types" component={Types}/>          
        <Route path="/not-found" component={NotFound}/>
        <Route path="/" component={Home}/>
      </Switch> 
    } else {
      loadRoutesIfTypesExist = <Switch>
        <Route path="/edit-own-user" component={EditOwnUser}/>
        <Route path="/change-password" component={ChangePassword}/>
        <Route path="/add-user" component={AddUser}/>
        <Route path="/all-services" component={AllServices}/>
        <Route path="/create-service" component={CreateService}/>        
        <Route path="/edit-service/:id" component={EditService}/>
        <Route path="/types" component={Types}/>          
        <Route path="/not-found" component={NotFound}/>
        <Route path="/" component={Home}/>
      </Switch> 
    }


    return (
      <div className='main-layout'>
        { loadRoutesIfTypesExist }
      </div>
    )
  }
}

export default MainLayout;