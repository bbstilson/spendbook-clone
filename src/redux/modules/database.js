import { API_ROOT } from '../../constants/Api';
import { checkStatus } from '../../utils/api';
import { hydrateTransactions } from './transaction';

import axios from 'axios';

const ADD_NEW_USER_FAILED = 'ADD_NEW_USER_FAILED';
const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';
const FETCH_USERNAME_SUCCESS = 'FETCH_USERNAME_SUCCESS';
const UPDATING_TOTAL = 'UPDATING_TOTAL';
const UPDATE_TOTAL_FAILED = 'UPDATE_TOTAL_FAILED';

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
        dispatch(fetchUserDataSuccess(res[0]));
        dispatch(hydrateTransactions(res));
      })
      .catch(err => {
        console.error('fetchUserData error: ', err);
      });
  }
}

function fetchUserDataSuccess({ name, total }) {
  return {
    name,
    total,
    type: FETCH_USERNAME_SUCCESS
  };
}

export function updateTotal(uid, total) {
  return dispatch => {

    dispatch(updatingTotal(total));

    axios.patch(`${API_ROOT}/api/user/${uid}`, { total })
      .then(checkStatus)
      .then((res) => {
        console.log('successfully updated total...', res);
      })
      .catch(err => {
        console.error('Error while updating total:', err);
        dispatch(updateTotalFailed(err));
      });
  }
}

function updatingTotal(total) {
  return {
    total,
    type: UPDATING_TOTAL
  };
}

function updateTotalFailed(err) {
  return {
    type: UPDATE_TOTAL_FAILED
  }
}

const initialState = {
  response: '',
  error: '',
  username: '',
  total: '$...'
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
        name: action.name,
        total: action.total
      };
    case UPDATING_TOTAL:
      return {
        ...state,
        total: action.total
      };
    default:
      return state;
  }
}
