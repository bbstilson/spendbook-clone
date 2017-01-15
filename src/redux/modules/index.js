import auth from './auth';
import app from './app';
import signup from './signup';
import transaction from './transaction';

import { combineReducers } from 'redux';

export default combineReducers({ app, auth, signup, transaction });
