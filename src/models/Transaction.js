import TransactionType from '../constants/TransactionType';
import expenseCategories from './expenseCategories';

import Immutable from 'immutable';

export default Immutable.Record({
  type: TransactionType.EXPENSE,
  category: expenseCategories.first().get('name'),
  icon: expenseCategories.first().get('icon'),
  amount: '0',
  notes: '',
  date: new Date()
});
