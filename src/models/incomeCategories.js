import Category from './category';

import Immutable from 'immutable';

export default Immutable.OrderedSet([
  Category({ name: 'Salary', icon: 'fa-usd' }),
  Category({ name: 'Allowance', icon: 'fa-money' })
]);
