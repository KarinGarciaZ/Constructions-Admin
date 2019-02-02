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
    let classes = [ ...this.state.smenuClasses ]
    
    return (
      <div className='sidebar'>
        <ul className='list-of-navs'>
          <Navlink cssClass={'navlink'} link='/' exact>
            <FontAwesomeIcon icon={faHome}/>
            <p className='link-name'>Home</p>
          </Navlink>

          <Navlink cssClass={'navlink'} link='/types'>
            <FontAwesomeIcon icon={faProjectDiagram}/>
            <p className='link-name'>Types</p>
          </Navlink>
          <Navlink cssClass={'navlink'} link='/addUser'>
            <FontAwesomeIcon icon={faUserPlus}/>
            <p className='link-name'>Add User</p>
          </Navlink>

          <li className='navlink' onClick={this.onToggleSubmenu}>
            <div className='link'>
              <FontAwesomeIcon icon={faCity}/>
              <p className='link-name'>Constructions</p>
            </div>            
          </li>

          <ul className={classes.join(' ')}>
            <Navlink cssClass={'smenu__link'} link='/allConstructions'>
              <FontAwesomeIcon icon={faList}/>
              <p className='link-name'>All Constructions</p>
            </Navlink>
            <Navlink cssClass={'smenu__link'} link='/createConstruction'>
              <FontAwesomeIcon icon={faPlusSquare}/>
              <p className='link-name'>New Construction</p>
            </Navlink>
          </ul>
          
        </ul>
      </div>
    )
  }
}
