import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import './Categories.css'

const Category = Immutable.Record({
  icon: '',
  name: ''
});

const expenseCategories = Immutable.OrderedSet([
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

const ExpenseCategories = ({ updateCategory }) => (
  <div className="category-container expense">
    {expenseCategories.map(({ name, icon }) => 
      <div className="category-wrapper">
        <div key={name} className="category">
          <span className={`category-icon expense-icon fa ${icon} fa-lg`} />
          {name}
        </div>
      </div>
    )}
  </div>
);

ExpenseCategories.propTypes = {
  updateCategory: PropTypes.func.isRequired
};

export default ExpenseCategories;
