import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <p className='header__title'>{this.props.headerTitle}</p>
        { this.props.user.username ? 
          (<div className='header__user'>
            <h4>{this.props.user.username}</h4>
          </div>) : null
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

export default connect(mapStateToProps)(Header);