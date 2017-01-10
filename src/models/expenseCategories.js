import Category from './Category';

import Immutable from 'immutable';

export default Immutable.OrderedSet([
  Category({ name: 'General', icon: 'fa-file' }),
  Category({ name: 'Food', icon: 'fa-cutlery' }),
  Category({ name: 'Drinks', icon: 'fa-coffee' }),
  Category({ name: 'Housing', icon: 'fa-home' }),
  Category({ name: 'Household', icon: 'fa-bed' }),
  Category({ name: 'Utilities', icon: 'fa-plug' }),
  Category({ name: 'Education', icon: 'fa-graduation-cap' }),
  Category({ name: 'Entertainment', icon: 'fa-video-camera' }),
  Category({ name: 'Car', icon: 'fa-car' }),
  Category({ name: 'Charity', icon: 'fa-handshake-o' }),
  Category({ name: 'Transport', icon: 'fa-train' }),
  Category({ name: 'Personal', icon: 'fa-user' }),
  Category({ name: 'Travel', icon: 'fa-plane' }),
  Category({ name: 'Health', icon: 'fa-medkit' }),
  Category({ name: 'Clothing', icon: 'fa-shopping-bag' }),
  Category({ name: 'Sports', icon: 'fa-futbol-o' }),
]);
