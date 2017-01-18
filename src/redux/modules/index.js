import auth from './auth';
import app from './app';
import database from './database';
import signup from './signup';
import transaction from './transaction';

import { combineReducers } from 'redux';

export default combineReducers({ app, auth, database, signup, transaction });
