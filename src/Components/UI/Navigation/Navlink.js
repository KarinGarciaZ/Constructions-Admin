import React from 'react';
import { NavLink } from 'react-router-dom';

const navlink = (props) => (
    <li className='navlink'>
      <NavLink 
        to={props.link} 
        exact={props.exact}
        activeClassName={'active'}        
      >
        {props.children}
      </NavLink>
    </li>
);

export default navlink;