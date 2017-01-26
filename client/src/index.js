import Router from './Router.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux/create';

ReactDOM.render(
  <Provider store={createStore()}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
