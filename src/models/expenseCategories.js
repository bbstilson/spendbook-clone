import Category from './category';

import Immutable from 'immutable';

export default Immutable.OrderedSet([
  // 'General',
  Category({ name: 'Food', icon: 'fa-cutlery' }),
  Category({ name: 'Drinks', icon: 'fa-coffee' })
  // 'Housing',
  // 'Household',
  // 'Utilities',
  // 'Education',
  // 'Entertainment',
  // 'Car',
  // 'Finance',
  // 'Transport',
  // 'Personal',
  // 'Travel',
  // 'Health',
  // 'Clothing',
  // 'Sports'
]);
