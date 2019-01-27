import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faProjectDiagram, faCity, faHome, faEdit, faPlusSquare, faList } from "@fortawesome/free-solid-svg-icons";

import Navlink from '../UI/Navigation/Navlink';

export default class Sidebar extends Component {

  state = {
    smenuClasses: ['smenu']
  }

  onToggleSubmenu = () => {
    if ( this.state.smenuClasses.length === 1 )
      this.setState({smenuClasses: ['smenu', 'smenu-active'] })
    else
      this.setState({smenuClasses: ['smenu'] })
  }

  render() {
    console.log('this.state.smenuClasses: ', this.state.smenuClasses);
    let classes = [ ...this.state.smenuClasses ]
    
    return (
      <div className='sidebar'>
        <ul className='list-of-navs'>
          <Navlink cssClass={'navlink'} link='/' exact>
            <FontAwesomeIcon icon={faHome}/>Home
          </Navlink>

          <li className='navlink' onClick={this.onToggleSubmenu}>
            <p className='link'>
              <FontAwesomeIcon icon={faCity}/>Constructions
            </p>            
          </li>

          <ul className={classes.join(' ')}>
            <Navlink cssClass={'smenu__link'} link='/allConstructions'>
              <FontAwesomeIcon icon={faList}/>All Constructions
            </Navlink>
            <Navlink cssClass={'smenu__link'} link='/createConstruction'>
              <FontAwesomeIcon icon={faPlusSquare}/>New Construction
            </Navlink>
            <Navlink cssClass={'smenu__link'} link='/editConstruction'>
              <FontAwesomeIcon icon={faEdit}/>Edit Construction
            </Navlink>
          </ul>

          <Navlink cssClass={'navlink'} link='/types'>
            <FontAwesomeIcon icon={faProjectDiagram}/>Types
          </Navlink>
          <Navlink cssClass={'navlink'} link='/addUser'>
            <FontAwesomeIcon icon={faUserPlus}/>Add User
          </Navlink>
        </ul>
      </div>
    )
  }
}
