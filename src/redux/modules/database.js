import axios from 'axios';

const API_ROOT = 'http://localhost:1337';

const ADD_NEW_USER_FAILED = 'ADD_NEW_USER_FAILED';
const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';

export function addNewUserToDb(uid) {
  return dispatch => {
    axios.post(`${API_ROOT}/api/user`, { uid })
      .then((res) => {
        dispatch(addNewUserSuccess(res));
      })
      .catch(err => {
        dispatch(addNewUserFailed(err));
      });
  }
}

function addNewUserSuccess(res) {
  return {
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

const initialState = {
  response: '',
  error: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_NEW_USER_SUCCESS:
      return {
        response: action.res
      };
    case ADD_NEW_USER_FAILED:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
