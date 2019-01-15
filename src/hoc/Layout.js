import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Footer from  '../Components/Layout/Footer';
import Sidebar from  '../Components/Layout/Sidebar';
import Header from  '../Components/Layout/Header';
import MainLayout from  '../Components/Layout/MainLayout';
import Login from '../Containers/Login';
import Aux from '../hoc/Auxiliar';

class Layout extends Component {

  render() {

    let containerToRender = (
      <Login />
    )

    if ( this.props.isAuth ){
      containerToRender = (
        <Aux>
          <Sidebar />
          <MainLayout />
        </Aux>
      )
     }

    return (
      <div className='container'>
        <Header />
          {containerToRender}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.userInfo.isAuth
  };
};

export default withRouter(connect( mapStateToProps )(Layout));