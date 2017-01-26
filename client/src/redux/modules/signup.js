import { createUser } from '../../firebase/auth';
import { authSuccess } from './auth';
import { addNewUserToDb } from './database';

const SIGNING_UP = 'SIGNING_UP';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILED = 'SIGNUP_FAILED';

export function signup(name, email, pw) {
  return dispatch => {
    dispatch(signingUp());

    return createUser(email, pw)
      .then(user => {
        dispatch(signupSuccess());
        dispatch(addNewUserToDb(name, user.uid));
        dispatch(authSuccess(user.uid, user, Date.now()));
      })
      .catch(err => {
        dispatch(signupFailed(err));
      });
  }
}

function signingUp() {
  return { type: SIGNING_UP };
}

function signupSuccess() {
  return { type: SIGNUP_SUCCESS };
}

function signupFailed(err) {
  return { error: err.message, type: SIGNUP_FAILED };
}

const initialState = {
  isFetching: false,
  error: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SIGNING_UP:
      return {
        ...state,
        isFetching: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
