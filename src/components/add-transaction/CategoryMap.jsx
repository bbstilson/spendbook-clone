import Category from './Category';

import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import './CategoryMap.css';

const CategoryMap = ({ selected, category, categories, updateCategory }) => (
  <div className={`category-map ${category}`}>
    {categories.map(({ name, icon }) => (
      <Category
          key={name}
          category={category}
          name={name}
          icon={icon}
          active={selected === name}
          onClick={() => { updateCategory(name) }} />
    ))}
  </div>
);

CategoryMap.propTypes = {
  selected: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  categories: PropTypes.instanceOf(Immutable.OrderedSet).isRequired,
  updateCategory: PropTypes.func.isRequired
};

export default CategoryMap;
