import { API_ROOT } from '../../constants/Api';
import Category from '../../models/Category';
import { checkStatus } from '../../utils/api';
import expenseCategories from '../../models/expenseCategories';
import incomeCategories from '../../models/incomeCategories';
import Transaction from '../../models/Transaction';
import TransactionType from '../../constants/TransactionType';

import Immutable from 'immutable';
import uuid from 'node-uuid';
import axios from 'axios';

// Constants
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const POSTING_TRANSACTION = 'POSTING_TRANSACTION';
const POST_SUCCESS = 'POST_SUCCESS';
const POST_FAILED = 'POST_FAILED';
const HYDRATE_TRANSACTIONS = 'HYDRATE_TRANSACTIONS';
const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';

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

export function finalizeTransaction(uid, transaction) {
  return dispatch => {
    const tid = uuid.v4();
    const postBody = transaction.toPostBody(uid, tid);

    dispatch(postingTransaction(tid));

    axios.post(`${API_ROOT}/api/transactions`, postBody)
      .then(checkStatus)
      .then((res) => {
        dispatch(transactionPostSuccess(tid));
      })
      .catch((err) => {
        console.error('Error while posting transaction:', err);
        dispatch(transactionPostFailed(tid));
      });
  }
}

function postingTransaction(tid) {
  return {
    tid,
    type: POSTING_TRANSACTION
  };
}

function transactionPostSuccess(tid) {
  return {
    tid,
    type: POST_SUCCESS
  };
}

function transactionPostFailed(tid) {
  return {
    tid,
    type: POST_FAILED
  };
}

export function hydrateTransactions(transactions) {
  const modeledTransactions = Immutable.OrderedSet(transactions.map(t => Transaction(t)));

  return {
    transactions: modeledTransactions,
    type: HYDRATE_TRANSACTIONS
  };
}

function updatedTransaction(state, action) {
  const type = action.key === 'type' ? action.value : state.get('type');

  const updatedCategoryIcon = updateCategoryIcon(state, action);
  const category = updatedCategoryIcon.get('name');
  const icon = updatedCategoryIcon.get('icon');

  const amount = action.key === 'amount' ? santizeAmount(action.value) : state.get('amount');
  const notes = action.key === 'notes' ? action.value : state.get('notes');

  return Transaction({ type, category, icon, amount, notes });
}

function santizeAmount(input) {
  const lastInput = input.slice(-1);
  // `input` is a number
  if (/\d/.test(lastInput)) {
    // `input` has a leading 0
    if (input.slice(0, 1) === '0') {
      return input.slice(1);
    } else {
      return input;
    }
  } else {
    return input.slice(0, input.length - 1);
  }
}

function updateCategoryIcon(state, action) {
  if (action.key === 'category') {
    return action.value;
  } else if (action.key === 'type') {
    // If the user changes transaction type, we need to set the category to the first category in that type.
    const activeCategory = action.value === TransactionType.EXPENSE ? expenseCategories : incomeCategories;
    return activeCategory.first();
  } else {
    return Category({
      name: state.get('category'),
      icon: state.get('icon')
    });
  }
}

const initialState = {
  transactions: Immutable.OrderedSet()
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        newTransaction: Transaction()
      };
    case POSTING_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.add(state.newTransaction)
      };
    case POST_SUCCESS:
      return {
        ...state,
        transactions: state.transactions.add(state.newTransaction)
      };
    case POST_FAILED:
      return {
        ...state
      };
    case HYDRATE_TRANSACTIONS: {
      return {
        ...state,
        transactions: action.transactions
      };
    }
    case UPDATE_TRANSACTION:
      return {
        ...state,
        newTransaction: updatedTransaction(state.newTransaction, action)
      };
    default:
      return state;
  }
}
