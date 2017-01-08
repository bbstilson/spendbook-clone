import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './Category.css';

function getClassnames(active, category, icon) {
  return classnames(icon, category.toLowerCase(), 'category-icon', 'fa', 'fa-lg', { active });
}

const Category = ({ active, category, name, icon, onClick }) => (
  <div onClick={onClick}>
    <div key={name} className="category">
      <span className={getClassnames(active, category, icon)} />
      {name}
    </div>
  </div>
);

Category.propTypes = {
  active: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Category;
