import TransactionType from '../../constants/TransactionType';
import Transaction from '../../models/Transaction';
import Category from '../../models/Category';
import expenseCategories from '../../models/expenseCategories';
import incomeCategories from '../../models/incomeCategories';

import Immutable from 'immutable';

// Constants
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const FINALIZE_TRANSACTION = 'FINALIZE_TRANSACTION';
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

export function finalizeTransaction() {
  return {
    type: FINALIZE_TRANSACTION
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
