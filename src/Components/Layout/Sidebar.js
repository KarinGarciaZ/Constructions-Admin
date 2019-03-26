import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faProjectDiagram, faCity, faHome, faPlusSquare, faList, faTools } from "@fortawesome/free-solid-svg-icons";

import Navlink from '../UI/Navigation/Navlink';

export default class Sidebar extends Component {

  state = {
    smenuClassesConstruction: ['smenu'],
    smenuClassesService: ['smenu']
  } 

  onToggleSubmenuConstruction = () => {    
    if ( this.state.smenuClassesConstruction.length === 1 )
      this.setState({smenuClassesConstruction: ['smenu', 'smenu-active'], smenuClassesService: ['smenu'] })
    else
      this.setState({smenuClassesConstruction: ['smenu'] })
  }

  onToggleSubmenuService = () => {
    if ( this.state.smenuClassesService.length === 1 )
      this.setState({smenuClassesService: ['smenu', 'smenu-active'], smenuClassesConstruction: ['smenu'] })
    else
      this.setState({smenuClassesService: ['smenu'] })
  }

  render() {
    let classesConstruction = [ ...this.state.smenuClassesConstruction ]
    let classesService = [ ...this.state.smenuClassesService ]
    
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
          <Navlink cssClass={'navlink'} link='/add-user'>
            <FontAwesomeIcon icon={faUserPlus}/>
            <p className='link-name'>Add User</p>
          </Navlink>
          
          <li className='navlink' onClick={this.onToggleSubmenuService}>
            <div className='link'>
              <FontAwesomeIcon icon={faTools}/>
              <p className='link-name'>Services</p>
            </div>            
          </li>

          <ul className={classesService.join(' ')}>
            <Navlink cssClass={'smenu__link'} link='/all-services'>
              <FontAwesomeIcon icon={faList}/>
              <p className='link-name'>All Services</p>
            </Navlink>
            <Navlink cssClass={'smenu__link'} link='/create-service'>
              <FontAwesomeIcon icon={faPlusSquare}/>
              <p className='link-name'>New Service</p>
            </Navlink>
          </ul>

          <li className='navlink' onClick={this.onToggleSubmenuConstruction}>
            <div className='link'>
              <FontAwesomeIcon icon={faCity}/>
              <p className='link-name'>Constructions</p>
            </div>            
          </li>

          <ul className={classesConstruction.join(' ')}>
            <Navlink cssClass={'smenu__link'} link='/all-constructions'>
              <FontAwesomeIcon icon={faList}/>
              <p className='link-name'>All Constructions</p>
            </Navlink>
            <Navlink cssClass={'smenu__link'} link='/create-construction'>
              <FontAwesomeIcon icon={faPlusSquare}/>
              <p className='link-name'>New Construction</p>
            </Navlink>
          </ul>
          
        </ul>
      </div>
    )
  }
}
