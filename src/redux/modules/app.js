import TransactionType from '../../constants/TransactionType';
import View from '../../constants/View';

import Immutable from 'immutable';

// Constants
const CHANGE_VIEW = 'CHANGE_VIEW';
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const FINALIZE_TRANSACTION = 'FINALIZE_TRANSACTION';
const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';

export function changeView(view) {
  return {
    view,
    type: CHANGE_VIEW
  };
}

// TODO: put into its own model file
const newTransaction = Immutable.Record({
  type: TransactionType.EXPENSE,
  category: '',
  amount: '0',
  note: ''
});

export function addTransaction() {
  return {
    type: ADD_TRANSACTION
  };
}

export function updateTransaction(key, value) {
  return {
    key,
    value,
    type: UPDATE_TRANSACTION
  };
}

export function finalizeTransaction() {
  return {
    type: FINALIZE_TRANSACTION
  };
}

const initialState = {
  activeView: View.OVERVIEW,
  transactions: Immutable.OrderedSet()
};

function updatedTransaction(state, action) {
  return newTransaction({
    type:     action.key === 'type' ?     action.value : state.get('type'),
    category: action.key === 'category' ? action.value : state.get('category'),
    amount:   action.key === 'amount' ?   action.value : state.get('amount')
  });
}

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
        newTransaction: newTransaction()
      };
    case FINALIZE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.add(state.newTransaction)
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        newTransaction: updatedTransaction(state.newTransaction, action)
      };
    default:
      return state;
  }
}
