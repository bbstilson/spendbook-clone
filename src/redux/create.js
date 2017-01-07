import rootReducer from './modules';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

export default () => {
  const middleware = [ thunk ];
  return applyMiddleware(...middleware)(createStore)(rootReducer)
}
