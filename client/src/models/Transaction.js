import TransactionType from '../constants/TransactionType';
import expenseCategories from './expenseCategories';

import Immutable from 'immutable';

const Transaction = Immutable.Record({
  uid: '',
  tid: '',
  type: TransactionType.EXPENSE,
  category: expenseCategories.first().get('name'),
  icon: expenseCategories.first().get('icon'),
  amount: '0',
  notes: '',
  date: new Date()
});

Transaction.prototype.toPostBody = function(uid, tid) {
  return {
    uid,
    tid,
    type: this.get('type'),
    category: this.get('category'),
    icon: this.get('icon'),
    amount: this.get('amount'),
    notes: this.get('notes'),
    date: this.get('date')
  };
};

export default Transaction;
