import Immutable from 'immutable';

export const View = {
  OVERVIEW: 'OVERVIEW',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  CONFIRM_TRANSACTION: 'CONFIRM_TRANSACTION'
};

// Constants
const CHANGE_VIEW = 'CHANGE_VIEW';
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const UPDATE_OLD_TRANSACTION = 'UPDATE_OLD_TRANSACTION';
const UPDATE_NEW_TRANSACTION = 'UPDATE_NEW_TRANSACTION';

export function addTransaction(transactionType, category, amount) {
  return {
    transactionType,
    category,
    amount,
    type: ADD_TRANSACTION
  }
}

export function updateOldTransaction() {
  return {
    type: UPDATE_OLD_TRANSACTION
  };
}

export function updateNewTransaction() {
  return {
    type: UPDATE_NEW_TRANSACTION
  };
}

export function changeView(view) {
  return {
    view,
    type: CHANGE_VIEW
  };
}

const initialState = {
  activeView: View.ADD_TRANSACTION,
  transactions: Immutable.OrderedSet()
};

const transaction = Immutable.Record({
  transactionType: undefined,
  category: undefined,
  amount: 0
});

export default (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        activeView: action.view
      };

    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.add(transaction(...action))
      };
    default:
      return state;
  }
}
