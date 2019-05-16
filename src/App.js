import React, { Component } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';

import Layout from './hoc/Layout';

class App extends Component {
  render() {
    return (
      <HashRouter>     
        <Layout />
      </HashRouter>
    );
  }
}

export default App;
