import React, { Component } from 'react';
import Footer from  '../Components/Layout/Footer';
import Sidebar from  '../Components/Layout/Sidebar';
import Header from  '../Components/Layout/Header';
import MainLayout from  '../Components/Layout/MainLayout';

class Layout extends Component {
  render() {
    return (
      <div className='container'>
        <Header />
        <Sidebar />
        <MainLayout />
        <Footer />
      </div>
    )
  }
}

export default Layout;