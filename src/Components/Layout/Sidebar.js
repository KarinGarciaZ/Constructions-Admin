import React, { Component } from 'react';
import Navlink from '../UI/Navigation/Navlink';

export default class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <ul className='list-of-navs'>
          <Navlink link='/allConstructions'>All Constructions</Navlink>
          <Navlink link='/createConstruction'>Create Construction</Navlink>
          <Navlink link='/types'>Types</Navlink>
          <Navlink link='/editOwnUser'>Edit User</Navlink>
          <Navlink link='/addUser'>Add User</Navlink>
        </ul>
      </div>
    )
  }
}
