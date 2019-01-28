import React from 'react';
import { NavLink } from 'react-router-dom';

const navlink = (props) => (
    <li className={props.cssClass}>
      <NavLink 
        to={props.link} 
        exact={props.exact}
        activeClassName='active'
        className='link'     
      >
        {props.children}
      </NavLink>
    </li>
);

export default navlink;