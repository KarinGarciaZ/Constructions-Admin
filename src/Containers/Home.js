import React, { Component } from 'react';
import Footer from  '../Components/Layout/Footer';
import Sidebar from  '../Components/Layout/Sidebar';
import Header from  '../Components/Layout/Header';
import MainLayout from  '../Components/Layout/MainLayout';

class Home extends Component {
  render() {
    return (
      <div className='container'>      
        <Header></Header>
        <Sidebar></Sidebar>
        <MainLayout></MainLayout>
        <Footer></Footer>
      </div>
    )
  }
}

export default Home;