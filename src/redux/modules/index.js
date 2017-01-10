// import auth from './auth';
import app from './app';
import transaction from './transaction';

import { combineReducers } from 'redux';

export default combineReducers({ app, transaction });
