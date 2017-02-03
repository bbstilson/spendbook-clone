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
const NO_TRANSACTIONS_TO_HYDRATE = 'NO_TRANSACTIONS_TO_HYDRATE';
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
    const postBody = transaction.toPostBody(uid);

    dispatch(postingTransaction());

    axios.post('api/transaction', postBody)
      .then(checkStatus)
      .then((res) => {
        console.log(res);
        dispatch(transactionPostSuccess());
      })
      .catch((err) => {
        console.error('Error while posting transaction:', err);
        dispatch(transactionPostFailed());
      });
  }
}

function postingTransaction() {
  return {
    type: POSTING_TRANSACTION
  };
}

function transactionPostSuccess() {
  return {
    type: POST_SUCCESS
  };
}

function transactionPostFailed() {
  return {
    type: POST_FAILED
  };
}

export function hydrateTransactions(transactions) {
  if (transactions[0].err) {
    return {
      type: NO_TRANSACTIONS_TO_HYDRATE
    };
  } else {
    const modeledTransactions = Immutable.OrderedSet(transactions.map(t => Transaction(t)));
    return {
      transactions: modeledTransactions,
      type: HYDRATE_TRANSACTIONS
    };
  }
}

function updatedTransaction(state, action) {
  const tid = state.get('tid');
  const type = action.key === 'type' ? action.value : state.get('type');

  const updatedCategoryIcon = updateCategoryIcon(state, action);
  const category = updatedCategoryIcon.get('name');
  const icon = updatedCategoryIcon.get('icon');

  const amount = action.key === 'amount' ? action.value : state.get('amount');
  const notes = action.key === 'notes' ? action.value : state.get('notes');

  return Transaction({ tid, type, category, icon, amount, notes });
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
        newTransaction: Transaction({ tid: uuid.v4() })
      };
    case POSTING_TRANSACTION:
      return {
        ...state,
        transactions: merge(state.newTransaction, state.transactions)
      };
    case POST_SUCCESS:
      return {
        ...state,
        // change status of post by tid to success...
      };
    case POST_FAILED:
      return {
        ...state,
        // change status of post by tid to failed...
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
    case NO_TRANSACTIONS_TO_HYDRATE:
      // TODO: make a nice user message.
      return state;
    default:
      return state;
  }
}

function merge(newTransaction, transactions) {
  // New transactions should be added to the top of the list.
  return Immutable.OrderedSet([ newTransaction ]).union(transactions);
}
