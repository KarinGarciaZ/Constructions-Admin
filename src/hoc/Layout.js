import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';

import Footer from  '../Components/Layout/Footer';
import Sidebar from  '../Components/Layout/Sidebar';
import Header from  '../Components/Layout/Header';
import MainLayout from  '../Components/Layout/MainLayout';
import OutRoutes from '../Containers/Out/OutRoutes';
import Aux from '../hoc/Auxiliar';
import Loading from '../Components/Layout/Loading';
import axios from '../axios-connection';

class Layout extends Component {

  state = {
    render: 'Aux'
  }

  componentWillMount() {
    this.renderAccess()
  }

  componentWillUpdate() {
    this.renderAccess()
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( this.props.isAuth === nextProps.isAuth && this.state.render === nextState.render )
      if( this.props.location.pathname === nextProps.location.pathname && this.props.match.params === nextProps.match.params )
        return false;
    return true;
  }

  renderAccess = () => {
    let containerToRender = 'Aux';

    if ( this.props.isAuth && localStorage.getItem('userToken') ){
      containerToRender = 'Aux';

    } else if ( localStorage.getItem('userToken') && !this.props.isAuth ) {
      axios.get( '/auth/getUserByToken')
      .then( resp => {
        if ( !this.props.isAuth ) {
          let userInfo = {
            username: resp.data.username,
            name: resp.data.name,
            email: resp.data.email,
            phoneNumber: resp.data.phoneNumber,
            isAuth: true
          }
          this.props.onLogin( userInfo );
        }
        containerToRender = 'Aux';        
        if( this.state.render !== containerToRender )  
          this.setState({render: containerToRender})
      })
      .catch( err => {
        containerToRender = 'Login'        
        if( this.state.render !== containerToRender )  
          this.setState({render: containerToRender}) 
      })
    }
    else 
      containerToRender = 'Login'
      
    if( this.state.render !== containerToRender )      
      this.setState({render: containerToRender})
  }

  render() {    
    let renderContainer = <Loading />;    
    console.log(' this.state.render: ',  this.state.render);
    if ( this.state.render === 'Login' )
      renderContainer = <OutRoutes />

    if ( this.state.render === 'Aux' )
      renderContainer = (
        <Aux>
          <Header />
          <Sidebar />
          <MainLayout />          
          <Footer />
        </Aux>
      )

    return (
      <div className='container'>
        {renderContainer}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.userInfo.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: payload => { dispatch(actionsCreators.login( payload )) }    
  }
}


export default withRouter(connect( mapStateToProps, mapDispatchToProps )(Layout));