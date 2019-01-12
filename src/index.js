import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducers/index';

const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
