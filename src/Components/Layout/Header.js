import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <p className='header__title'>{this.props.headerTitle}</p>
        <div className='header__user'>Username</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    headerTitle: state.headerTitle.title
  };
};

export default connect(mapStateToProps)(Header);