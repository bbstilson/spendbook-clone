import Router from './Router.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux/create';

const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

ReactDOM.render(
  <Provider store={createStore(devTool)}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
