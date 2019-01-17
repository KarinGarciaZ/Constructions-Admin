import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actionsCreators from '../../store/actions/index';

class Header extends Component {

  onLogout = () => {
    this.props.onLogout( { isAuth: false } );
    this.props.onUpdateFormState( {} );
  }

  render() {

    let dropdown = (
      <div className='header__user'>
        <h4>{this.props.user.username}</h4>
        <nav className='header__user--menu'>
          <div className='header__user--menu__info'>
            <p className='header__user--menu__info--name'>{this.props.user.name}</p>
            <p className='header__user--menu__info--email'>{this.props.user.email}</p>
          </div>
          <NavLink className='header__user--menu__edit' to='/editOwnUser' >Edit User</NavLink>
          <p className=''>Change Password</p>
          <p className='header__user--menu__logout' onClick={this.onLogout}>Logout</p>
        </nav>
      </div>
    )

    return (
      <div className='header'>
        <p className='header__title'>{this.props.headerTitle}</p>
        { this.props.user.username ? dropdown : null
        }
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    headerTitle: state.headerTitle.title,
    user: state.auth.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: payload => dispatch(actionsCreators.login( payload )),    
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);