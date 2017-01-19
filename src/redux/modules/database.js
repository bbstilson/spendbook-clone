import { API_ROOT } from '../../constants/Api';
import { checkStatus } from '../../utils/api';
import { hydrateTransactions } from './transaction';

import axios from 'axios';

const ADD_NEW_USER_FAILED = 'ADD_NEW_USER_FAILED';
const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';
const FETCH_USERNAME_SUCCESS = 'FETCH_USERNAME_SUCCESS';

export function addNewUserToDb(name, uid) {
  return dispatch => {
    axios.post(`${API_ROOT}/api/user`, { name, uid })
      .then((res) => {
        dispatch(addNewUserSuccess(name, res));
      })
      .catch(err => {
        dispatch(addNewUserFailed(err));
      });
  }
}

function addNewUserSuccess(username, res) {
  return {
    username,
    res,
    type: ADD_NEW_USER_SUCCESS
  };
}

function addNewUserFailed(error) {
  return {
    error,
    type: ADD_NEW_USER_FAILED
  };
}

export function fetchUserData(uid) {
  return dispatch => {
    axios.get(`${API_ROOT}/api/user/${uid}`)
      .then(checkStatus)
      .then(({ res }) => {
        dispatch(fetchUserDataSuccess(res[0].name));
        dispatch(hydrateTransactions(res));
      })
      .catch(err => {
        console.error('fetchUserData error: ', err);
      });
  }
}

function fetchUserDataSuccess(username) {
  return {
    username,
    type: FETCH_USERNAME_SUCCESS
  };
}

const initialState = {
  response: '',
  error: '',
  username: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_NEW_USER_SUCCESS:
      return {
        ...state,
        username: action.username,
        response: action.res
      };
    case ADD_NEW_USER_FAILED:
      return {
        ...state,
        error: action.error
      };
    case FETCH_USERNAME_SUCCESS:
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
}
