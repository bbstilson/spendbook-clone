import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import './Categories.css'

const Category = Immutable.Record({
  icon: '',
  name: ''
});

const incomeCategories = Immutable.OrderedSet([
  Category({ name: 'Salary', icon: 'fa-usd' }),
  Category({ name: 'Allowance', icon: 'fa-money' })
]);

const ImportCategories = ({ updateCategory }) => (
  <div className="category-container income">
    {incomeCategories.map(({ name, icon }) => 
      <div className="category-wrapper">
        <div key={name} className="category">
          <span className={`category-icon income-icon fa ${icon} fa-lg`} />
          {name}
        </div>
      </div>
    )}
  </div>
);

ImportCategories.propTypes = {
  updateCategory: PropTypes.func.isRequired
};

export default ImportCategories;
