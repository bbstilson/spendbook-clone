import { authenticate, unauthenticate } from '../../firebase/auth';
import { fetchUserName } from './database';

/**
 * CONSTANTS
 */

const AUTHENTICATING = 'AUTHENTICATING';
const AUTH_FAILED = 'AUTH_FAILED';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const UNAUTH = 'UNAUTH';

/**
 * ACTIONS
 */

export function login (email, pw) {
  return dispatch => {
    dispatch(authenticating());

    return authenticate(email, pw)
      .then((user) => {
        dispatch(fetchUserName(user.uid));
        dispatch(authSuccess(user.uid, user, Date.now()));
      })
      .catch(err => {
        dispatch(authFailed(err));
      });
  }
}

function authenticating () {
  return {
    type: AUTHENTICATING
  };
}

export function authSuccess (uid, user, timestamp) {
  return {
    uid,
    type: AUTH_SUCCESS,
  };
}

function authFailed (error) {
  return {
    error: toUserFriendlyErrorMessage(error),
    type: AUTH_FAILED
  };
}

function toUserFriendlyErrorMessage(error) {
  console.log(error);
  switch(error.code) {
    case 'auth/user-not-found':
      return "Sorry, we couldn't find that user.";
    case 'auth/invalid-email':
      return "Oops, looks like you didn't enter a valid email.";
    default:
      return "Sorry, something happened. Try again. If it keeps happening, let me know.";
  }
}

export function logout () {
  return dispatch => {
    dispatch(unauthUser());
    unauthenticate();
  }  
}

function unauthUser () {
  return {
    type: UNAUTH
  };
}

// function unauthUserSuccess () {
//   return {
//     type: UNAUTH
//   };
// }

// function unauthUserFailed () {
//   return {
//     type: UNAUTH
//   };
// }

/**
 * REDUCERS
 */

const initialState = {
  isFetching: false,
  isAuthed: false,
  authedId: '',
  error: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        isFetching: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthed: true,
        authedId: action.uid
      };
    case AUTH_FAILED:
      return {
        ...state,
        isFetching: false,
        isAuthed: false,
        error: action.error
      };
    case UNAUTH:
      return {
        ...state,
        isAuthed: false,
        authedId: ''
      };
    default:
      return state;
  }
}
