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
import NotFound from '../../Containers/NotFound';
import axios from '../../axios-connection';
import Aux from '../../hoc/Auxiliar';

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
      loadRoutesIfTypesExist = <Aux>
        <Route path="/construction/:id" component={Construction}/>
        <Route path="/edit-construction/:id" component={EditConstruction}/>
        <Route path="/construction" component={Construction}/>
        <Route path="/all-constructions" component={AllConstructions}/>
        <Route path="/create-construction" component={CreateConstruction}/>
      </Aux>
    }

    return (
      <div className='main-layout'>
        <Switch>
          {loadRoutesIfTypesExist}
          <Route path="/edit-own-user" component={EditOwnUser}/>
          <Route path="/change-password" component={ChangePassword}/>
          <Route path="/add-user" component={AddUser}/>
          <Route path="/types" component={Types}/>          
          <Route path="/not-found" component={NotFound}/>
          <Route path="/" component={Home}/>
        </Switch> 
      </div>
    )
  }
}

export default MainLayout;