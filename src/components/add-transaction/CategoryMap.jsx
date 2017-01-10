import Category from './Category';

import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import './CategoryMap.css';

const CategoryMap = ({ selected, category, categories, updateCategory }) => (
  <div className="category-map">
    {categories.map((cat) => (
      <Category
          key={cat.name}
          category={category}
          name={cat.name}
          icon={cat.icon}
          active={selected === cat.name}
          onClick={() => { updateCategory(cat) }} />
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
