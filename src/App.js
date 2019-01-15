import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Layout from './hoc/Layout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>     
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
